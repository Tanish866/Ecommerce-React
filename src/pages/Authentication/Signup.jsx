import Auth from "../../components/Auth/Auth";
import { Link } from 'react-router-dom';

function Signup(){
    return(
        <div className="container">
            <div className="row">
                <div className="home-title text-center ">Welcome to Shop Cart</div>
            </div>
            <div className="Login">
                <div className="login-wrapper" id="loginForm">
                    <h4 className="text-center">Signup</h4>
                </div>
                <Auth/>
                <div className="signup-btn text-center" id="showSignUp">
                    <Link to="/signin" >
                        Already have an account? Sign in here
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default Signup;