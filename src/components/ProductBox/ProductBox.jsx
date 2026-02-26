
// CSS Imports
import { Link } from 'react-router-dom';
import './ProductBox.css';

function ProductBox({ ProductImage, ProductName, ProductPrice }){
    return(
        <div className="product-list-box" id="product-list-box">
            <Link 
                to="/products/2" 
                className="product-item text-decoration-none d-inline-block text-center">
                <div className="product-image">
                    <img src={ProductImage}/>
                </div>
                <div className="product-name">{ProductName}</div>
                <div className="product-price">{ProductPrice}</div>
            </Link>
        </div>
    );
}
export default ProductBox;