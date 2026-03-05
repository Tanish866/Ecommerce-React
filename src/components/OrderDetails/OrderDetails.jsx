
// CSS impors
import './OrderDetails.css';

function OrderDetails(){
    const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return(
        <>
            <div className="order-details-title fw-bold">Order Details</div><div className="order-details-product d-flex flex-row">
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
                                {quantity.map(optionValue => <option key={optionValue} value={optionValue}>{optionValue}</option>)}
                            </select>
                        </div>
                        <button className="order-details-product-remove btn btn-danger">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default OrderDetails;