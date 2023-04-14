import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import HeaderDropDown from "./HeaderDropDown";
import "./styles.css";

const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ padding: "1rem" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">
            {" "}
            <h4> Shopify </h4>{" "}
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">
              {" "}
              Home{" "}
            </NavLink>
          </Nav>
          <HeaderDropDown />
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
