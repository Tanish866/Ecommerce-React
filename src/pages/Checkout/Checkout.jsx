import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import { getProduct, updateProuctInCart } from '../../apis/fakeStoreProdApi';
import './Checkout.css';

function Checkout(){

    const {cart, setCart} = useContext(CartContext);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [address, setAddress] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        async function downloadProducts(){
            if(!cart || !cart.products) return;
            const productMapping = {};
            cart.products.forEach(p => { productMapping[p.productId] = p.quantity; });
            const promises = cart.products.map(p => axios.get(getProduct(p.productId)));
            const responses = await axios.all(promises);
            const detailed = responses.map(res => ({
                ...res.data,
                quantity: productMapping[res.data.id]
            }));
            setProducts(detailed);
        }
        downloadProducts();
    }, [cart]);

    const totalPrice = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const deliveryCharge = totalPrice > 500 ? 0 : 50;
    const netPrice = totalPrice + deliveryCharge;

    async function handlePlaceOrder(){
        if(!address){
            alert('Please enter delivery address');
            return;
        }
        try {
            const removePromises = products.map(product =>
                axios.put(updateProuctInCart(), {
                    userId: user.id,
                    productId: product.id,
                    quantity: 0
                })
            );
            await axios.all(removePromises);
        } catch(error) {
            console.log('Error clearing cart:', error);
        }
        setCart(null);
        setOrderPlaced(true);
    }

    if(orderPlaced){
        return(
            <div className="container text-center" style={{marginTop: '5rem'}}>
                <div className="success-icon">✓</div>
                <h3 className="text-success mt-3">Order Placed Successfully!</h3>
                <p className="text-muted">Thank you {user?.username}! We'll deliver to your address soon.</p>
                <Link to="/products" className="btn btn-primary mt-2">Continue Shopping</Link>
            </div>
        );
    }

    if(!cart || !cart.products || cart.products.length === 0){
        return(
            <div className="container text-center" style={{marginTop: '5rem'}}>
                <h4 className="text-muted">No items to checkout!</h4>
                <Link to="/products" className="btn btn-primary mt-3">Start Shopping</Link>
            </div>
        );
    }

    return(
        <div className="container">
            <h2 className="checkout-title text-center">Checkout</h2>

            <div className="checkout-box">
                <h5 className="fw-bold mb-3">Order Summary</h5>
                {products.map(product => (
                    <div key={product.id} className="d-flex justify-content-between mb-2">
                        <div>{product.title.substring(0, 25)}... × {product.quantity}</div>
                        <div>₹ {(product.price * product.quantity).toFixed(2)}</div>
                    </div>
                ))}
                <hr/>
                <div className="d-flex justify-content-between">
                    <div>Delivery</div>
                    <div className={deliveryCharge === 0 ? 'text-success' : ''}>
                        {deliveryCharge === 0 ? 'Free' : `₹ ${deliveryCharge}`}
                    </div>
                </div>
                <div className="d-flex justify-content-between fw-bold mt-2">
                    <div>Total</div>
                    <div>₹ {netPrice.toFixed(2)}</div>
                </div>
            </div>

            <div className="checkout-box mt-3">
                <h5 className="fw-bold mb-3">Delivery Address</h5>
                <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter your full address..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>

            <div className="d-flex gap-3 mt-3 mb-5">
                <Link to={`/cart/${user?.id}`} className="btn btn-outline-secondary">
                    Back to Cart
                </Link>
                <button onClick={handlePlaceOrder} className="btn btn-primary">
                    Place Order
                </button>
            </div>
        </div>
    );
}
export default Checkout;