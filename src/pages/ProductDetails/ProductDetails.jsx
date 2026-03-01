import { Link, useParams } from 'react-router-dom';

// CSS Imports
import './ProductDetails.css';
import { getProduct } from '../../apis/fakeStoreProdApi';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ProductDetails(){

    const {id} = useParams();
    const [product, setProduct] = useState();

    async function downloadProductById(id){
        const response = await axios.get(getProduct(id));
        setProduct(response.data);
        console
    }

    useEffect(() => {
        downloadProductById(id);
    }, []);


    return (
        product && <div classNameName="product-details">
            <div classNameName="container">
                <div classNameName="row">
                    <div className="product-details-wrapper d-flex justify-content-around align-items-start flex-row">
                    <div className="product-image d-flex">
                        <img 
                            src={product.image}
                            id="product-image"
                        />
                    </div>

                    <div className="product-details-box d-flex flex-column">
                        <div className="product-details">
                            <div className="product-name" id="product-name">{product.title}</div>
                            <div className="product-price fw-bold" id="product-price">&#8377; {product.price}</div>
                            <div className="product-description">
                                <div className="product-description-title fw-bold" id="product-description-title">Description</div>
                                <div className="product-description-data" id="product-description-data">
                                    {product.description}
                                </div>
                            </div>
                        </div>
                        <div className="product-details-action btn btn-primary text-decoration-none">Add to Cart</div>
                            <Link 
                                to="/cart/2"
                                id="goToCartbtn" 
                                className="product-details-action btn btn-warning">
                                    <Link to="/cart" className='cartbtn' >
                                        Go to Cart
                                    </Link>
                            </Link>
                        </div>
                    </div>
                                   
                </div>
            </div>
        </div>
    )
}
export default ProductDetails;