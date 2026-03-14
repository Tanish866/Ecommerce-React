import { useEffect, useState } from 'react';
import './Auth.css';

function Auth({onSubmit, resetForm}){

    const [formDetails, setFormDetails] = useState({username:'', email:'', password:'', isLoading: false});
    const [errorMsg, setErrorMsg] = useState('');

    function updateUsername(val){
        setFormDetails({...formDetails, username: val});
    }
    function updateEmail(val){
        setFormDetails({...formDetails, email: val});
    }
    function updatePassword(val){
        setFormDetails({...formDetails, password: val});
    }

    async function onFormSubmit() {
        setErrorMsg('');
        setFormDetails(prev => ({...prev, isLoading: true}));
        try {
            await onSubmit(formDetails);
        } catch (error) {
            setErrorMsg('Invalid username or password. Please try again.');
        } finally {
            setFormDetails(prev => ({...prev, isLoading: false}));
        }
    }

    useEffect(() =>{
        setFormDetails({username:'', email:'', password:'', isLoading: false});
        setErrorMsg('');
    }, [resetForm]);

    return(
        <>
            <div className="input-group">
                <input onChange={(e) => updateUsername(e.target.value)} value={formDetails.username} type="text" className="form-control" id="username" placeholder="Username" />
            </div>
            <div className="input-group">
                <input onChange={(e) => updateEmail(e.target.value)} value={formDetails.email} type="email" className="form-control" id="UserEmail" placeholder="Useremail" />
            </div>
            <div className="input-group">
                <input onChange={(e) => updatePassword(e.target.value)} value={formDetails.password} type="password" className="form-control" id="userPassword" placeholder="Password" />
            </div>

            {errorMsg && (
                <div className="alert alert-danger py-2" role="alert">
                    {errorMsg}
                </div>
            )}

            <div className="input-group">
                <button onClick={onFormSubmit} className="form-control btn btn-primary" type="button" disabled={formDetails.isLoading}>
                    {formDetails.isLoading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                    {formDetails.isLoading ? 'Loading...' : 'Submit'}
                </button>
            </div>
        </>
    );
}
export default Auth;