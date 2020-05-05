import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';

class Navigation extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render () {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">T.T.A.</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#">Stores</Nav.Link>
            <Nav.Link href="#">Parts</Nav.Link>
            <Nav.Link href="#">Tickets</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;