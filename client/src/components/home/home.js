import React, { Component } from 'react';

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render () {
    return (
      <div>
      	<h1>Welcome to the Ticket Tracker App</h1>
        <p>This app allows you to create and track tickets</p>
        <p>Tickets include stores, parts, and ticket status</p>
        <p>You are able to add, view, and edit parts and stores at any time</p>
        <p>Once you have added parts and stores, you can select them in the ticket screen</p>
      </div>
    );
  }
}

export default Home;