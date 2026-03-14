import { useEffect, useState } from 'react';
import FilterProduct from '../../components/FilterProduct/FilterProduct';
import ProductBox from '../../components/ProductBox/ProductBox';
import { getAllProduct, getProductByCategory } from '../../apis/fakeStoreProdApi';
import { useSearchParams } from 'react-router-dom';


//CSS imports
import './ProductList.css';
import axios from 'axios';

function ProductList(){

    const [productList, setProductList] = useState(null);
    const [filterList, setFilterList] = useState(null);

    const [query] = useSearchParams();

    async function downloadAllProduct(category){

        const downloadUrl = category ? getProductByCategory(category) : getAllProduct();
        const response = await axios.get(downloadUrl);
        console.log(response.data);
        setProductList(response.data);
        console.log(query.get("category"));
    }

    useEffect(() => {
        if(!productList) return;

        const minPrice = Number(query.get("minPrice"));
        const maxPrice = Number(query.get("maxPrice"));
        if(minPrice == 0 && maxPrice == 0){
            setFilterList(productList);
            return;
        }
        const filtered = productList.filter(product => {
            const price = product.price;
            if(minPrice > 0 && maxPrice > 0) return price >= minPrice && price <= maxPrice;
            if(minPrice > 0) return price >= minPrice;
            if(maxPrice > 0) return price <= maxPrice;
            return true;
        });
        setFilterList(filtered);

    }, [productList, query]);

    useEffect(() => {
        downloadAllProduct(query.get("category"));
    }, [query.get("category")]);

    const displayList = filterList || productList;

    return(
        <div className="container">
            <div className="row">
                <h1 className="product-list-title text-center"> All Products</h1>
                
                <div className="product-list-wrapper d-flex flex-row">
                    <FilterProduct/>
                    <div className="product-list-box" id="product-list-box">
                        {displayList && displayList.length > 0 
                                    ?  displayList.map((product) => <ProductBox {...product}key={product.id} />)
                                    :<div className="text-center w-100 mt-5 text-muted fs-5">
                                        No products found in this price range.
                                    </div>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;