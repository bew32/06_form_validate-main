import React, { useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
function Menu() {
    const [isOpen, setIsOPen] = useState(false);
    const toggle = () => setIsOPen(!isOpen);
    return (
        <Navbar className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" expand="md">
            <NavbarBrand href="/">SE Stroe</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className='mr-auto' navbar>
                    <NavItem><NavLink href="/">Product List</NavLink></NavItem>
                    <NavItem><NavLink href="/add">Add new Product</NavLink></NavItem>
                    {/* <NavItem><NavLink href="/edit">Edit Product</NavLink></NavItem> */}
                </Nav>
            </Collapse>
        </Navbar>

    )
}

export default Menu
