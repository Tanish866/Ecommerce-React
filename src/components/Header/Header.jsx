import { useState } from 'react';
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

// CSS imports
import './Header.css';
import { Link } from 'react-router-dom';

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

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
                <DropdownItem>Cart</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Log Out</DropdownItem>
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