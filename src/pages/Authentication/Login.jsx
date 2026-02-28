import { Link } from 'react-router-dom';
import Auth from '../../components/Auth/Auth';

//CSS Imports
import './Auth.css';

function Login(){
    return (
        <div className="container">
            <div className="row">
                <div className="home-title text-center ">Welcome to Shop Cart</div>
            </div>
            <div className="Login">
                <div className="login-wrapper" id="loginForm">
                    <h4 className="text-center">Login</h4>
                </div>
                <Auth/>
                <div className="signup-btn text-center" id="showSignUp">
                    <Link to="/signup" >
                        Don't have an account? Sign up here
                    </Link>
                </div>
            </div>
        </div>
            
    );
}
export default Login;