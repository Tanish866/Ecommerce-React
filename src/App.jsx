// library imports
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useCookies } from 'react-cookie';
import axios from 'axios';

//Context imports
import UserContext from './context/UserContext';

// Custom components
import Header from './components/Header/Header'
import MainRoutes from './routes/MainRoutes';

// CSS imports
import './App.css'
import CartContext from './context/CartContext';
import fetchUserCart from './helper/fetchUserCart';
import Footer from './components/Footer/Footer';
console.log("ENV CHECK:", import.meta.env.VITE_FAKE_STORE_URL);
function App() {

  const [user, setUser] = useState(null);
  const [token, setToken] = useCookies(['jwt-token']);
  const [cart, setCart] = useState(null);

  async function accesstoken(){
    try {
      const res = await axios.get(`${import.meta.env.VITE_FAKE_STORE_URL}/accesstoken`, {withCredentials: true});
      
      if (!res.data.token) {
        // No token yet — user isn't logged in, nothing to decode
        setUser(null);
        return;
      }

      setToken("jwt-token", res.data.token, {httpOnly: true});
      const tokenDetails = jwtDecode(res.data.token);
      console.log("access token details", tokenDetails);
      setUser({username: tokenDetails.user, id: tokenDetails.id});
    } catch (error) {
      console.log("Failed to fetch access token:", error);
      setUser(null);
    }
  }

  async function load(){
    if(!user){
      accesstoken();
    }
    if(user){
      await fetchUserCart(user.id, setCart);
    }
  }

  useEffect(() => {
    load();
  }, [user]);


  return (
    <UserContext.Provider value={{user, setUser}}>
    <CartContext.Provider value={{cart, setCart}}>
      <div className='app-wrapper'>
        <Header className="header" color="light" light={true} expand="md" container="md" />
        <div style={{flex: 1}}>
          <MainRoutes/>
        </div>
        <Footer className="footer"/>
      </div>
    </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default App;
