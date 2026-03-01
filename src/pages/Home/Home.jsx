import axios from 'axios';
import { useEffect, useState } from 'react';import Category from '../../components/Category/Category';


//CSS Imports
import './Home.css';
import { getAllCategories } from '../../apis/fakeStoreProdApi';

function Home(){

    const [categories, setCategories] = useState([]);

    async function downloadCategories(){
        const response = await axios.get(getAllCategories());
        setCategories(response.data);
    }
    
    useEffect(() => {
        downloadCategories();
    }, [])

    return(
        <div className="container">
        <div className="row">
            <div className="home-title text-center" id="home-title">Welcome to Shop Cart</div>
            <div className="category-list d-flex flex-row justify-content-between align-items-center" id="category-list">
                
                <Category itemName="All Products" />
                {categories && categories.map((category) => <Category itemName={category} key={category} filter={category} />)}

            </div>
            <div className="category-title text-center" >
                Select a category to start shopping
            </div>
        </div>
     </div>
    );
}
export default Home;