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
          _id: "",
          storeNumber: "",
          desc: "",
          createDate: "",
          editDate: "",
          closedDate: "",
          partsList: [{sku: ""}],
          notes: [ {body: "", date: ""}]
      },
      tempTicket: {
          _id: "",
          storeNumber: "",
          desc: "",
          createDate: "",
          editDate: "",
          closedDate: "",
          partsList: [{sku: ""}],
          notes: [ {body: "", date: ""}]
      },
      storesList: [],
      partsList: [],
      ticketList: []
    }
    this.handleCreateButton = this.handleCreateButton.bind(this);
    this.handleSelectButton = this.handleSelectButton.bind(this);

    this.handleCreateTicket = this.handleCreateTicket.bind(this);

    this.handleSelectedStoreFormChange = this.handleSelectedStoreFormChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);

    this.handleSelectedTicket = this.handleSelectedTicket.bind(this);
  }

    componentDidMount(){
      fetch('/stores')
        .then(res => res.json())
        .then(stores => this.setState({storesList: stores.data}));
      fetch('/parts')
        .then(res => res.json())
        .then(parts => this.setState({partsList: parts.data}));
      fetch('/tickets')
        .then(res => res.json())
        .then(tickets => this.setState({ticketList: tickets.data}))

  }

  handleSelectedTicket(event){
    let ticketChange = this.state.selectedTicket;
    ticketChange._id = event.target.value;
    this.setState({selectedTicket: ticketChange});
  }

  handleSelectedStoreFormChange(event){
    let storeChange = this.state.tempTicket;
    storeChange.storeNumber = event.target.value;
    this.setState({tempTicket: storeChange})
  }

  handleSelectButton(event){
    fetch('/ticket/' + this.state.selectedTicket._id)
    .then(response => response.json())
    .then(ticket => {
      this.setState({selectedTicket: ticket.data});
      this.setState({view: "selected"});
    });

    event.preventDefault();
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
    delete ticketToCreate._id

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
            <form onSubmit={this.handleSelectButton}>
              <label >
              Select a Ticket to view
                <select onChange={this.handleSelectedTicket}>
                  {this.state.ticketList.map( ticket => 
                    <option key={ticket._id} value={ticket._id}>{ticket._id}</option>
                  )}
                </select>
              </label>
              <br />
              <input type="submit" value="Select" />
            </form>

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