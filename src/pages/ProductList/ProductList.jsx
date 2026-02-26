import ProductImage from '../../assets/product.jpg';
import ProductBox from '../../components/ProductBox/ProductBox';

//CSS imports
import './ProductList.css';

function ProductList(){
    return(
        <div className="container">
            <div className="row">
                <h1 className="product-list-title text-center"> All Products</h1>
                <div className="product-list-wrapper d-flex flex-row">
                    <ProductBox 
                        ProductImage={ProductImage}
                        ProductName={"Some Product"}
                        ProductPrice={1000}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductList;