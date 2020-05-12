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
          notes: [ {body: "", date: ""}]
      },
      tempTicket: {
          storeNumber: "",
          desc: "",
          createDate: "",
          editDate: "",
          closedDate: "",
          partsList: [{sku: ""}],
          notes: [ {body: "", date: ""}]
      },
      storesList: [],
      partsList: []
    }
    this.handleCreateButton = this.handleCreateButton.bind(this);

    this.handleCreateTicket = this.handleCreateTicket.bind(this);

    this.handleSelectedStoreFormChange = this.handleSelectedStoreFormChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

    componentDidMount(){
      fetch('/stores')
        .then(res => res.json())
        .then(stores => this.setState({storesList: stores.data}));
      fetch('/parts')
        .then(res => res.json())
        .then(parts => this.setState({partsList: parts.data}));

  }

  handleSelectedStoreFormChange(event){
    let storeChange = this.state.tempTicket;
    storeChange.storeNumber = event.target.value;
    this.setState({tempTicket: storeChange})
  }

  handleFormChange(event){
    let ticketChange = this.state.tempTicket;

      switch(event.target.name){
        case "desc":
          ticketChange.desc = event.target.value; break;
        default:
          console.log("Error, form name is not defined"); break;
      }
      this.setState({tempTicket: ticketChange});
  }

  handleCreateButton(event){
    this.setState({view: "create"});
  }

  handleCreateTicket(event){

    let ticketToCreate = this.state.tempTicket;

    ticketToCreate.createDate = new Date();
    ticketToCreate.notes = [];
    ticketToCreate.partsList = [];

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticketToCreate)
    };

    fetch('/ticket', requestOptions)
        .then(response => response.json())
        .then(ticket => {
          this.setState({selectedTicket: ticket.data});
          this.setState({view: "selected"});
          //console.log(ticket.data);
    });


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
              <select onChange={this.handleSelectedStoreFormChange}>
                {this.state.storesList.map( store => 
                  <option key={store._id} value={store.storeNumber}>{store.storeNumber}</option>
                )}
              </select>
            </label>
            <label>
              Description
              <input type="text" name="desc" value={this.state.tempTicket.desc} onChange={this.handleFormChange}/>
            </label>
            <input type="submit" value="Create Ticket" />
          </form>
          </div>
        );
    } else if (this.state.view === "selected"){
      page = ( <div>
        <h1>Selected </h1> 
        <p>Store Number : {this.state.selectedTicket.storeNumber}</p>
        <p> Description : {this.state.selectedTicket.desc}</p>
        <p> Create Date : {this.state.selectedTicket.createDate}</p>
        <p> Edit Date : {this.state.selectedTicket.editDate}</p>
        <p> Closed Date : {this.state.selectedTicket.closedDate}</p>
        <p> Parts List : {this.state.selectedTicket.partsList}</p>
        <p> Notes : {this.state.selectedTicket.notes}</p>

        </div>);
    }
    return (
      <div> {page}</div>

    );
  }
}

export default Tickets;