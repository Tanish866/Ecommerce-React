import Category from '../../components/Category/Category';
import useCategory from '../../hooks/useCategory';

//CSS Imports
import './Home.css';

function Home(){

    const [categories] = useCategory();

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