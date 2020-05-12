/*********************************************************************************************************************
*
* Ticket Component
* ----------------
* Add, Edit, and View tickets
*
************************************************************************************************************************/


import React, { Component } from 'react';

class Tickets extends Component {

  constructor(props){
    super(props);
    this.state = {
      view: "default",
      selectedTicket: {
          storeNumber: "",
          desc: "",
          createDate: "",
          editDate: "",
          closedDate: "",
          partsList: [{sku: ""}],
          Notes: [ {body: "", date: ""}]
      },
      tempTicket: {
          storeNumber: "",
          desc: "",
          createDate: "",
          editDate: "",
          closedDate: "",
          partsList: [{sku: ""}],
          Notes: [ {body: "", date: ""}]
      },
      storesList: [],
      partsList: []
    }
    this.handleCreateButton = this.handleCreateButton.bind(this);

    this.handleCreateTicket = this.handleCreateTicket.bind(this);

    this.handleSelectedStoreChange = this.handleSelectedStoreChange.bind(this);
  }

    componentDidMount(){
      fetch('/stores')
        .then(res => res.json())
        .then(stores => this.setState({storesList: stores.data}));
      fetch('/parts')
        .then(res => res.json())
        .then(parts => this.setState({partsList: parts.data}));

  }

  handleSelectedStoreChange(event){
    console.log(event);
  }

  handleCreateButton(event){
    this.setState({view: "create"});
  }

  handleCreateTicket(event){
    console.log("Send ticket to server to be created");
    console.log(this.state.tempTicket);

    event.preventDefault();
  }

  render () {
    let page;

    if(this.state.view === "default"){
      page = ( 
          <div>
            <h1>Tickets</h1>

            <button onClick={this.handleCreateButton}>Create</button>
          </div>
        )
    } else if (this.state.view === "create"){
      page = (
          <div>
            <h1>Create</h1>
            <form  onSubmit={this.handleCreateTicket}>
            <label>
             Select a Store
              <select onChange={this.handleSelectedStoreChange}>
                {this.state.storesList.map( store => 
                  <option key={store._id} value={store.storeNumber}>{store.storeNumber}</option>
                )}
              </select>
            </label>
            <input type="submit" value="Create Ticket" />
          </form>
          </div>
        );
    }
    return (
      <div> {page}</div>

    );
  }
}

export default Tickets;