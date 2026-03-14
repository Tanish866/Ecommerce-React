import axios from "axios";
import { getCartbyUser } from "../apis/fakeStoreProdApi";

async function fetchUserCart(userId, setCart){
    try {
        const response = await axios.get(getCartbyUser(userId));
        const userCart = response.data[0];
        if(!userCart || !userCart.products || userCart.products.length === 0){
            setCart(null); 
            return;
        }
        setCart(userCart);
    } catch(error) {
        setCart(null); 
    }
}
export default fetchUserCart;