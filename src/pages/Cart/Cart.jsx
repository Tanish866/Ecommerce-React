// CSS imports
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart(){
    const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return(
        <div className="container">
            <div className="row">
                <h2 className="cart-title text-center">Your Cart</h2>
            </div>
            <div className="cart-wrapper d-flex flex-row">
                <div className="orderDetails d-flex flex-column" id="orderDetails">
                    <div className="order-details-title fw-bold">Order Details</div>
                    <div className="order-details-product d-flex flex-row">
                        <div className="order-details-product-img d-flex">
                            <img src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png" alt="" />
                        </div>
                        <div className="order-details-product-data d-flex flex-column justify-content-center">
                            <div>Mens Casual Premium Slim Fit T-Shirts</div>
                            <div>22.3</div>
                        </div>
                        <div className="order-details-product-action d-flex flex-column">
                            <div className="order-details-product-quantity">
                                <div className="fw-bold">Quantity</div>
                                <div className="form-group">
                                    <select className='form-select'>
                                        {quantity.map(optionValue => <option key={optionValue} value={optionValue} >{optionValue}</option>)}
                                    </select>
                                </div>
                                <button className="order-details-product-remove btn btn-danger">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
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