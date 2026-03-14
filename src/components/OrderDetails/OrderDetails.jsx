import './OrderDetails.css';

function OrderDetails({title, price, image, quantity, onRemove, onQuantityChange}){

    const quantitymap = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return(
        <>
            <div className="order-details-product d-flex flex-row">
                <div className="order-details-product-img d-flex">
                    <img src={image} alt={title} />
                </div>
                <div className="order-details-product-data d-flex flex-column justify-content-center">
                    <div>{title}</div>
                    <div>₹ {price}</div>
                    <div className="text-muted" style={{fontSize: '0.9rem'}}>
                        Subtotal: ₹ {(price * quantity).toFixed(2)}
                    </div>
                </div>
                <div className="order-details-product-action d-flex flex-column">
                    <div className="order-details-product-quantity">
                        <div className="fw-bold">Quantity</div>
                        <div className="form-group">
                            <select 
                                className='form-select'
                                value={quantity}
                                onChange={(e) => onQuantityChange(Number(e.target.value))}
                            >
                                {quantitymap.map((id) => (
                                    <option key={id} value={id}>{id}</option>
                                ))}
                            </select>
                        </div>
                        <button 
                            onClick={onRemove} 
                            className="order-details-product-remove btn btn-danger">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            <hr/>
        </>
    );
}

export default OrderDetails;