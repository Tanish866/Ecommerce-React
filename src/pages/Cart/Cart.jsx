import { Link } from 'react-router-dom';
import './Cart.css';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../context/CartContext';
import axios from 'axios';
import { getProduct, updateProuctInCart } from '../../apis/fakeStoreProdApi';
import UserContext from '../../context/UserContext';

function Cart(){

    const {cart, setCart} = useContext(CartContext);
    const [products, setProduct] = useState([]);
    const {user} = useContext(UserContext);

    // ✅ real price calculations — updates automatically when products change
    const totalPrice = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const discount = 0;
    const deliveryCharge = totalPrice > 500 ? 0 : 50;
    const netPrice = totalPrice - discount + deliveryCharge;

    async function downloadCart(cart){
        if(!cart || !cart.products) return;

        const productMapping = {};
        cart.products.forEach(product => {
            productMapping[product.productId] = product.quantity;
        });

        const productPromise = cart.products.map((product) => axios.get(getProduct(product.productId)));
        const productPromiseResponse = await axios.all(productPromise);
        const downloadProduct = productPromiseResponse.map((product) => ({
            ...product.data, 
            quantity: productMapping[product.data.id]
        }));
        setProduct(downloadProduct);
    }

    async function updateProduct(productId, quantity){
        if(!user) return;
        const response = await axios.put(updateProuctInCart(), {userId: user.id, productId, quantity});
        setCart({...response.data});
    }

    useEffect(() => {
        downloadCart(cart);
    }, [cart]);

    return(
        <div className="container">
            <div className="row">
                <h2 className="cart-title text-center">Your Cart</h2>
            </div>

            {!cart || !cart.products || cart.products.length === 0 ? (
                <div className="d-flex flex-column align-items-center justify-content-center" style={{marginTop: '5rem', gap: '1.5rem'}}>
                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" 
                        alt="empty cart" 
                        style={{width: '150px', opacity: '0.4'}}
                    />
                    <h4 className="text-muted">Your cart is empty!</h4>
                    <p className="text-muted">Looks like you haven't added anything yet.</p>
                    <Link to="/products" className="btn btn-primary">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="cart-wrapper d-flex flex-row">
                    <div className="orderDetails d-flex flex-column" id="orderDetails">
                        <div className="order-details-title fw-bold">Order Details</div>
                        {products.map((product) => 
                            <OrderDetails 
                                key={product.id}
                                title={product.title}
                                image={product.image}
                                price={product.price}
                                quantity={product.quantity}
                                onRemove={() => updateProduct(product.id, 0)}
                                onQuantityChange={(newQty) => updateProduct(product.id, newQty)}
                            />
                        )}
                    </div>
                    <div className="priceDetails d-flex flex-column">
                        <div className="price-details-box">
                            <div className="price-details-title fw-bold">Price Details</div>
                            <div className="price-details-data">
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Price ({products.length} items)</div>
                                    <div>₹ {totalPrice.toFixed(2)}</div>
                                </div>
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Discount</div>
                                    <div className="text-success">- ₹ {discount.toFixed(2)}</div>
                                </div>
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Delivery Charges</div>
                                    <div className={deliveryCharge === 0 ? 'text-success' : ''}>
                                        {deliveryCharge === 0 ? 'Free' : `₹ ${deliveryCharge}`}
                                    </div>
                                </div>
                                <hr/>
                                <div className="price-details-item d-flex flex-row justify-content-between fw-bold">
                                    <div>Total Amount</div>
                                    <div>₹ {netPrice.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="price-details-b-group d-flex">
                            <Link to="/products" className="continue-shopping-btn btn btn-info text-decoration-none">
                                Continue Shopping
                            </Link>
                            <Link to="/checkout" className="checkout-btn btn btn-primary text-decoration-none">
                                Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Cart;