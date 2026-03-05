// CSS imports
import { Link, useParams } from 'react-router-dom';
import './Cart.css';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import useCart from '../../hooks/useCart';

function Cart(){

    const {userId} = useParams();
    
    const [ cart, setCart ] = useCart(userId);


    return(
        <div className="container">
            <div className="row">
                <h2 className="cart-title text-center">Your Cart</h2>
            </div>
            <div className="cart-wrapper d-flex flex-row">
                <div className="orderDetails d-flex flex-column" id="orderDetails">
                    <OrderDetails/>
                </div>
                <div className="priceDetails d-flex flex-column">
                    <div className="price-details-box">
                        <div className="price-details-title fw-bold">Price Details</div>
                        <div className="price-details-data">
                            <div className="price-details-item d-flex flex-row justify-content-between">
                                <div>Price</div>
                                <div id="total-price">1000</div>
                            </div>
                            <div className="price-details-item d-flex flex-row justify-content-between">
                                <div>Discount</div>
                                <div>10</div>
                            </div>
                            <div className="price-details-item d-flex flex-row justify-content-between">
                                <div>Delivery Charges</div>
                                <div>Free</div>
                            </div>
                            <div className="price-details-item d-flex flex-row justify-content-between">
                                <div>Total Cost</div>
                                <div id="net-price">2000</div>
                            </div>
                        </div>
                    </div>
                    <div className="price-details-b-group d-flex">
                        <Link 
                            to="/products" 
                            className="continue-shopping-btn btn btn-info text-decoration-none">
                            Continue Shopping
                        </Link>
                        <Link
                            to="/checkout"
                            className="checkout-btn btn btn-primary text-decoration-none">
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Cart;