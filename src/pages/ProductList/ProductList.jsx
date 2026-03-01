import { useEffect, useState } from 'react';
import ProductImage from '../../assets/product.jpg';
import FilterProduct from '../../components/FilterProduct/FilterProduct';
import ProductBox from '../../components/ProductBox/ProductBox';
import { getAllProduct } from '../../apis/fakeStoreProdApi';

//CSS imports
import './ProductList.css';
import axios from 'axios';

function ProductList(){

    const [productList, setProductList] = useState(null);

    async function downloadAllProduct(){
        const response = await axios.get(getAllProduct());
        console.log(response.data);
        setProductList(response.data);
    }

    useEffect(() => {
        downloadAllProduct();
    }, []);

    return(
        <div className="container">
            <div className="row">
                <h1 className="product-list-title text-center"> All Products</h1>
                
                <div className="product-list-wrapper d-flex flex-row">
                <FilterProduct/>
                <div className="product-list-box" id="product-list-box">
                    {productList && productList.map((product) => <ProductBox 
                                                        {...product}
                                                        key={product.id}
                                                        
                                                    />
                        )}
                </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;