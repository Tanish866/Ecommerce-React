import { useEffect, useState } from 'react';
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
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';

// CSS imports
import './Header.css';
import { Link } from 'react-router-dom';

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const [token, setToken, removeToken] = useCookies(['jwt-token']);
  return (
    <div className='Navbar'>
      <Navbar {...props}>
        <NavbarBrand id='title'>
          <Link to="/" >Shop Cart</Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
            </NavItem>
            <UncontrolledDropdown nav inNavbar style={{marginRight:"2rem"}}>
              <DropdownToggle nav caret id='options'>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  {<Link to="/cart" >Cart</Link>}
                </DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  {token['jwt-token'] ? 
                    <Link onClick={() => {
                      removeToken("jwt-token");
                    }
                  } to='/signin'>LogOut</Link> : <Link to='/signin'>SignIn</Link>}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavbarText id='username'>Username</NavbarText>
          </Nav>
          
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;