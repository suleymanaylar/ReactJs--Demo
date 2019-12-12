import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from "reactstrap";
import CartSummary from "./CartSummary";

export default class Navi extends Component {
  constructor(props) {
    super(props);

    this.toogle = this.toogle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toogle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">E-Ticaret Demo</NavbarBrand>
          <NavbarToggler />
          <Collapse navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem>
             <CartSummary cart={this.props.cart}></CartSummary>
            </Nav>
            <NavbarText>Sepettekiler - </NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
