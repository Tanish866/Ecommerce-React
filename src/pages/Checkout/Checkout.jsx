import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import { getProduct } from '../../apis/fakeStoreProdApi';
import './Checkout.css';

function Checkout(){

    const {cart, setCart} = useContext(CartContext);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        paymentMethod: 'cod'
    });

    // ✅ Download product details to get real prices
    useEffect(() => {
        async function downloadProducts(){
            if(!cart || !cart.products) return;

            const productMapping = {};
            cart.products.forEach(p => {
                productMapping[p.productId] = p.quantity;
            });

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

    // ✅ Real price calculations from downloaded products
    const totalPrice = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const deliveryCharge = totalPrice > 500 ? 0 : 50;
    const netPrice = totalPrice + deliveryCharge;

    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function handlePlaceOrder(){
        const {fullName, email, phone, address, city, pincode} = formData;
        if(!fullName || !email || !phone || !address || !city || !pincode){
            alert('Please fill all fields');
            return;
        }
        setCart(null); // ✅ clear cart after order
        setOrderPlaced(true);
    }

    // Order success screen
    if(orderPlaced){
        return(
            <div className="container">
                <div className="order-success d-flex flex-column align-items-center justify-content-center">
                    <div className="success-icon">✓</div>
                    <h2 className="text-success mt-3">Order Placed Successfully!</h2>
                    <p className="text-muted">Thank you {user?.username}! Your order has been placed.</p>
                    <p className="text-muted">You will receive a confirmation soon.</p>
                    <Link to="/products" className="btn btn-primary mt-3">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    // Empty cart check
    if(!cart || !cart.products || cart.products.length === 0){
        return(
            <div className="container">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{marginTop: '5rem', gap: '1.5rem'}}>
                    <h4 className="text-muted">No items to checkout!</h4>
                    <Link to="/products" className="btn btn-primary">Start Shopping</Link>
                </div>
            </div>
        );
    }

    return(
        <div className="container">
            <div className="row">
                <h2 className="checkout-title text-center">Checkout</h2>
            </div>
            <div className="checkout-wrapper d-flex flex-row">

                {/* Left — Delivery & Payment Form */}
                <div className="checkout-form-box d-flex flex-column">
                    <div className="checkout-section">
                        <h5 className="checkout-section-title">Delivery Details</h5>
                        <div className="form-group mb-3">
                            <input 
                                type="text" 
                                name="fullName"
                                className="form-control" 
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input 
                                type="email" 
                                name="email"
                                className="form-control" 
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input 
                                type="text" 
                                name="phone"
                                className="form-control" 
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <textarea 
                                name="address"
                                className="form-control" 
                                placeholder="Full Address"
                                rows="3"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-flex gap-3">
                            <div className="form-group mb-3 flex-fill">
                                <input 
                                    type="text" 
                                    name="city"
                                    className="form-control" 
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group mb-3 flex-fill">
                                <input 
                                    type="text" 
                                    name="pincode"
                                    className="form-control" 
                                    placeholder="Pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="checkout-section mt-3">
                        <h5 className="checkout-section-title">Payment Method</h5>
                        <div className="payment-options d-flex flex-column gap-2">
                            <label className="payment-option">
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="cod"
                                    checked={formData.paymentMethod === 'cod'}
                                    onChange={handleChange}
                                />
                                &nbsp; Cash on Delivery
                            </label>
                            <label className="payment-option">
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="upi"
                                    checked={formData.paymentMethod === 'upi'}
                                    onChange={handleChange}
                                />
                                &nbsp; UPI
                            </label>
                            <label className="payment-option">
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="card"
                                    checked={formData.paymentMethod === 'card'}
                                    onChange={handleChange}
                                />
                                &nbsp; Credit / Debit Card
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right — Order Summary */}
                <div className="checkout-summary d-flex flex-column">
                    <div className="checkout-summary-box">
                        <h5 className="checkout-section-title">Order Summary</h5>
                        <div className="checkout-summary-items">
                            {/* ✅ Real product names and prices */}
                            {products.map((product) => (
                                <div key={product.id} className="checkout-summary-item d-flex justify-content-between">
                                    <div className="checkout-product-name">
                                        {product.title.substring(0, 20)}... × {product.quantity}
                                    </div>
                                    <div>₹ {(product.price * product.quantity).toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                        <hr/>
                        <div className="d-flex justify-content-between">
                            <div>Subtotal ({products.length} items)</div>
                            <div>₹ {totalPrice.toFixed(2)}</div>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <div>Delivery</div>
                            <div className={deliveryCharge === 0 ? 'text-success' : ''}>
                                {deliveryCharge === 0 ? 'Free' : `₹ ${deliveryCharge}`}
                            </div>
                        </div>
                        <hr/>
                        <div className="d-flex justify-content-between fw-bold fs-5">
                            <div>Total</div>
                            <div>₹ {netPrice.toFixed(2)}</div>
                        </div>
                        <button 
                            onClick={handlePlaceOrder}
                            className="btn btn-primary w-100 mt-3">
                            Place Order
                        </button>
                        <Link 
                            to={`/cart/${user?.id}`} 
                            className="btn btn-outline-secondary w-100 mt-2">
                            Back to Cart
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Checkout;