import { Link, useParams } from 'react-router-dom';

// CSS Imports
import './ProductDetails.css';
import { useEffect } from 'react';
import axios from 'axios';
import { getProductById } from '../../apis/fakeStoreProdApi';

function ProductDetails(){

    const { id } = useParams();
    async function downloadProductById(){
        const response = await axios.get(getProductById(id));
        console.log(response.data);
    }

    useEffect(() => {
        downloadProductById();
    }, [id]);

    return (
        <div classNameName="product-details">
            <div classNameName="container">
                <div classNameName="row">
                    <div className="product-details-wrapper d-flex justify-content-around align-items-start flex-row">
                    <div className="product-image d-flex">
                        <img 
                            src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png" 
                            id="product-image"
                        />
                    </div>

                    <div className="product-details-box d-flex flex-column">
                        <div className="product-details">
                            <div className="product-name" id="product-name">Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</div>
                            <div className="product-price fw-bold" id="product-price">₹ 109.95</div>
                            <div className="product-description">
                                <div className="product-description-title fw-bold" id="product-description-title">Description</div>
                                <div className="product-description-data" id="product-description-data">
                                    Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday
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