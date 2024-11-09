// frontend/src/components/Navbar.js

import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Navbar.Brand href="/">Timewise Finance</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#networth">Net Worth</Nav.Link>
          <Nav.Link as={Link} to="/spending">Spending</Nav.Link>
          <Nav.Link href="#news">News</Nav.Link>
          <Nav.Link href="#notifications">Notifications</Nav.Link>
          <Nav.Link href="#futureme">Future Me</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
