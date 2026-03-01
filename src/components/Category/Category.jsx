import { Link } from 'react-router-dom';
import './Category.css';

function Category({ itemName }){
    return(
        <div className="category-items d-flex justify-content-center align-items-center">
            <Link to="/products">{itemName}</Link>
        </div>
    )
}
export default Category;