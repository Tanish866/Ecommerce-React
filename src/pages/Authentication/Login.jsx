import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { jwtDecode } from "jwt-decode";

import UserContext from '../../context/UserContext';
import Auth from '../../components/Auth/Auth';
import { signin } from '../../apis/fakeStoreProdApi';

import './Auth.css';

function Login(){

    const authRef = useRef(null);
    const navigate = useNavigate();
    const [token, setToken] = useCookies(["jwt-token"]);
    const { setUser } = useContext(UserContext);

    async function onAuthformSubmit(authArguments){
        try {
            const response = await axios.post(signin(), {
                username: authArguments.username,
                email: authArguments.email,
                password: authArguments.password
            }, { withCredentials: true });

            const receivedToken = response.data.token;

            setToken("jwt-token", receivedToken, {
                path: "/",
                sameSite: "none",
                secure: true
            });

            const tokenDetails = jwtDecode(receivedToken);
            console.log("Token details:", tokenDetails);

            setUser({ username: tokenDetails.user, id: tokenDetails.id });
            navigate('/');
        } catch(error) {
            console.log("Login error:", error);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="home-title text-center">Welcome to Shop Cart</div>
            </div>
            <div className="Login">
                <div className="login-wrapper" id="loginForm">
                    <h4 className="text-center">Login</h4>
                </div>
                <Auth
                    onSubmit={onAuthformSubmit}
                    ref={authRef}
                />
                <div className="signup-btn text-center" id="showSignUp">
                    <Link to="/signup">
                        Don't have an account? Sign up here
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default Login;