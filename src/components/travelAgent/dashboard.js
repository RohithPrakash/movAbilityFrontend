import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";

import "../../assets/styles/navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import NewRequest from "./newRequest";
import OpenRequest from "./openRequests";
import ClosedRequest from "./closedRequests";
import CareReceiver from "./careReceiver";

class TravelAgent extends Component {
  render() {
    return (
      <HashRouter>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          fixed="top"
          className="navBackground"
        >
        <Navbar.Brand href="/">
        <i>mov</i>Ability<sub className="smallFont">by IATA</sub>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#">New Request</Nav.Link>
              <Nav.Link href="#">Open Request</Nav.Link>
              <Nav.Link href="#">Closed Request</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </HashRouter>
    );
  }
}

export default TravelAgent;
