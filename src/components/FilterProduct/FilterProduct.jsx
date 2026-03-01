import useCategory from '../../hooks/useCategory';
import { useNavigate } from 'react-router-dom';

// CSS Imports
import './FilterProduct.css';


function FilterProduct(){

    const minPriceOptions = [0, 10, 50, 100, 200, 1000];
    const maxPriceOptions = [0, 10, 50, 100, 200, 1000];

    const [categories] = useCategory();
    const navigate = useNavigate();
    function handleCategoryNavigate(category){
        navigate(`/products?category=${category}`);
    }

    return(
         <div className="product-list-sidebar d-flex flex-column">
            <div classNameName="sidebar-title ">Search Product</div>
            <div className="sidebar-group form-group">
                <input type="text" placeholder="Search by name" className="form-control"/>
            </div>
            <div className="sidebar-title fw-bold">Categories</div>
            <div className="categorylist" id="categorylist">

                {
                    categories && 
                    categories.map((Category) => <a
                                                    onClick={() => handleCategoryNavigate(Category)}
                                                    className="d-flex text-decoration-none"
                                                    key={Category}
                                                >
                                                    {Category}
                                            </a>)}

            </div>
            <div className="sidebar-title">Filter by price</div>
            <div className="price-filter">
                <div className="price-filter-select d-flex justify-content-between flex-row">
                    <div className="form-group">
                        <select name="minPrice" className="form-select" id="minPrice">
                            {minPriceOptions.map(optionValue => <option key={optionValue} value={optionValue} >{optionValue}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <select name="maxPrice" className="form-select" id="maxPrice">
                            {maxPriceOptions.map(optionValue => <option key={optionValue} value={optionValue} >{optionValue}</option>)}
                        </select>
                    </div>
                </div>
                <div className="price-filter-title d-flex justify-content-between flex-row">
                    <div className="price-filter-label-min">Min Price</div>
                    <div className="price-filter-label-max">Max Price</div>
                </div>
            </div>
            <button className="btn btn-warning searchFilter" id="search">Search</button>
            <button className="btn btn-danger clearFilter" id="clear">Clear Filter</button>
        </div>
    );
}
export default FilterProduct;