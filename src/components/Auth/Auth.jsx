// CSS imports
import './Auth.css';
function Auth(){
    return(
        <>
            <div className="input-group">
                <input type="text" className="form-control" id="username" placeholder="Username" />
            </div><div className="input-group">
                <input type="password" className="form-control" id="userPassword" placeholder="Password" />
            </div><div className="input-group">
                <button className="form control btn btn-primary ">Submit</button>
            </div>
        </>
    );
}
export default Auth;