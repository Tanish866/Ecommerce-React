import { useContext, useEffect } from "react";
import CartContext from "../context/CartContext";
import { getCartbyUser } from "../apis/fakeStoreProdApi";
import axios from "axios";

function useCart(userId){
    const {cart, setCart} = useContext(CartContext);
    console.log(userId);
    async function fetchUserCart(){
        const response = await axios.get(getCartbyUser(userId ? userId : undefined));
        console.log(response.data[0]);
        console.log(response);
        setCart(response.data[0]);
    }
    useEffect(() => {
        fetchUserCart(userId);
    }, [userId]);
    return [cart, setCart];
}
export default useCart;