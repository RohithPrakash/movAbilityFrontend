import React, { Component } from "react";
import { Route, Switch, Link, HashRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/navbar.css";
import "../../assets/styles/taDashboard.css";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Iata from "./iata";
import Airline from "./airline";
import Airport from "./airport";
import TravelAgency from "./travelAgency";
import HomeLanding from "./homeLanding";
import Login from "../login/login";
import Register from "../register/Register";

import logo from "../../assets/images/logo.png";

class Home extends Component {
  render() {
    return (
      <div className="min-vh-100">
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="dark"
          fixed="top"
          sticky="top"
          className="navBackground"
        >
          <Navbar.Brand href="/">
            <img src={logo} alt="logo" className="w-50 h-50" />
          </Navbar.Brand>
          <div className="placeHolder" />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className="active rounded" as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link className="active rounded" as={Link} to="/IATA">
                IATA
              </Nav.Link>
              <Nav.Link className="active rounded" as={Link} to="/Airport">
                Airport
              </Nav.Link>
              <Nav.Link className="active rounded" as={Link} to="/Airline">
                Airline
              </Nav.Link>
              <Nav.Link className="active rounded" as={Link} to="/TravelAgency">
                Travel Agency
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link className="active rounded" as={Link} to="/Register">
                Sign Up
              </Nav.Link>
              <Nav.Link className="active rounded" as={Link} to="/Login">
                Log In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <HashRouter>
          <Switch>
            <Route exact path="/" component={HomeLanding} />
            <Route path="/IATA" component={Iata} />
            <Route path="/Airport" component={Airport} />
            <Route path="/Airline" component={Airline} />
            <Route path="/TravelAgency" component={TravelAgency} />
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default Home;
