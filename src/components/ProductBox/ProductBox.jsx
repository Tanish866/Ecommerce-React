
// CSS Imports
import { Link } from 'react-router-dom';
import './ProductBox.css';

function ProductBox({ ProductImage, ProductName, ProductPrice }){
    return(
        <Link 
            to="/products/2" 
            className="product-item text-decoration-none d-inline-block text-center">
            <div className="product-image">
                <img src={ProductImage}/>
            </div>
            <div className="product-name">{ProductName}</div>
            <div className="product-price">{ProductPrice}</div>
        </Link>
    );
}
export default ProductBox;