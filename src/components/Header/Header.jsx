import { useContext, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { useCookies } from 'react-cookie';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../../context/UserContext';
import './Header.css';
import CartContext from '../../context/CartContext';

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const location = useLocation();

  const toggle = () => setIsOpen(!isOpen);
  const [token, setToken, removeToken] = useCookies(['jwt-token']);

  async function logout() {
    try {
      await axios.get(`${import.meta.env.VITE_FAKE_STORE_URL}/logout`, { withCredentials: true });
    } catch (error) {
      console.log("Logout failed:", error);
    }
    setUser(null);
    setCart(null);
  }

  return (
    <div className='Navbar'>
      <Navbar {...props}>
        <NavbarBrand tag={Link} to="/" id="title">
          Shop Cart
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <UncontrolledDropdown nav inNavbar style={{ marginRight: "2rem" }}>
              <DropdownToggle nav caret id='options'>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                {user &&
                  <DropdownItem>
                    <Link style={{textDecoration: 'none', color: 'black'}} to={`/cart/${user.id}`}>
                      Cart {cart && cart.products && cart.products.length > 0
                        ? `(${cart.products.length})`
                        : '(0)'}
                    </Link>
                  </DropdownItem>
                }
                <DropdownItem divider />
                <DropdownItem>
                  {user ? (
                    <Link style={{textDecoration: 'none', color: 'black'}} onClick={() => logout()} to='/signin'>LogOut</Link>
                  ) : location.pathname === '/signup' ? (
                    <Link style={{textDecoration: 'none', color: 'black'}} to='/signin'>SignIn</Link>
                  ) : (
                    <Link style={{textDecoration: 'none', color: 'black'}} to='/signup'>SignUp</Link>
                  )}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {user && <NavbarText id='username'>{user.username}</NavbarText>}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;