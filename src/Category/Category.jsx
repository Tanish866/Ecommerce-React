import { Link } from 'react-router-dom';
import './Category.css';

function Category(){
    return(
        <div className="category-items d-flex justify-content-center align-items-center">
            <Link to="/products"> All Products </Link>
        </div>
    )
}
export default Category;