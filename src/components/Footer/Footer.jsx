import './Footer.css';

function Footer(){
    return(
        <footer className="footer">
            <div className="container">
                <div className="footer-content d-flex justify-content-between align-items-center">
                    <div className="footer-title">Shop Cart</div>
                    <div className="text-muted">© 2025 Shop Cart. All rights reserved.</div>
                    <div className="text-muted">📧 support@shopcart.com</div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;