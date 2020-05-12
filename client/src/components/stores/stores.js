/*********************************************************************************************************************
*
* Stores Component
* ----------------
* Add, Edit, and View Stores
*
************************************************************************************************************************/

import React, { Component } from 'react';

class Stores extends Component {

  constructor(props){
    super(props);
    this.state = {
      view: "default",
      selectedStore: {
        _id: "",
        storeNumber:"",
        address: { 
          street: "",
          city: "",
          province:""
        },
        phoneNumber: ""
      },
      tempStore: {
        _id: "",
        storeNumber:"",
        address: { 
          street: "",
          city: "",
          province:""
        },
        phoneNumber: ""
      },
      storesList: []
    }
    this.handleSelectButton = this.handleSelectButton.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
    this.handleEditButton = this.handleEditButton.bind(this);

    this.selectedStoreChange = this.selectedStoreChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);

    this.handleEditStore = this.handleEditStore.bind(this);
    this.handleAddStore = this.handleAddStore.bind(this);
  }

  componentDidMount(){
      fetch('/stores')
        .then(res => res.json())
        .then(stores => this.setState({storesList: stores.data}));
  }

  selectedStoreChange(event){
      let activeStore = this.state.selectedStore;
      activeStore._id = event.target.value;
      this.setState({selectedStore: activeStore});
    }

  handleSelectButton(event){
    fetch('/stores/' + this.state.selectedStore._id)
    .then(res => res.json())
    .then(part => {
      this.setState({selectedStore: part.data});
      this.setState({view: "select"});
    });
      
    event.preventDefault();
  }

  handleEditButton(event){
 
    this.setState({view: "edit"});
    this.setState({tempStore: this.state.selectedStore});
    event.preventDefault();
  }

  handleAddButton(event){
    this.setState({view: "add"});
  }

  handleEditStore(event){
    let storeToUpdate = this.state.tempStore;

      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(storeToUpdate)
      };

      fetch('/store', requestOptions)
        .then(response => response.json())
        .then(store => {
          if(store.status !== 'error'){
            this.setState({selectedStore: store.data});
            this.setState({view: "select"});
          }else {
            alert("Error updating the part to the database");
          }
        });
      event.preventDefault();
  }

  handleAddStore(event){
    let storeToAdd = this.state.tempStore;
    delete storeToAdd._id;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(storeToAdd)
    };

    fetch('/store', requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data.status !== 'error'){
            this.setState({selectedStore: data.data});
            this.setState({view: "select"});
          }else {
            alert("Error adding the store to the database");

          }
        });

    event.preventDefault();
  }

  handleFormChange(event){
      let storeChange = this.state.tempStore;

      switch(event.target.name){
        case "storeNumber":
          storeChange.storeNumber = event.target.value; break;
          case "street":
          storeChange.address.street = event.target.value; break;
          case "city":
          storeChange.address.city = event.target.value; break;
          case "province":
          storeChange.address.province = event.target.value; break;
          case "phoneNumber":
          storeChange.phoneNumber = event.target.value; break;
        default:
          console.log("Error, form name is not defined"); break;
      }
      this.setState({tempStore: storeChange});
 
    }

  render () {
    let page;
    if(this.state.view === "default"){
      page = (
        <div>
          <h1>Stores</h1>
          <form onSubmit={this.handleSelectButton}>
            <label>
              Select a Store to view
              <select onChange={this.selectedStoreChange}>
                {this.state.storesList.map( store => 
                  <option key={store._id} value={store._id}>{store.storeNumber}</option>
                )}
              </select>
            </label>
            <br />
            <input type="submit" value="Select" />
          </form>
          <button onClick={this.handleAddButton}>Add</button>
        </div>
      );
    } else if (this.state.view === "select"){
      page = (
        <div>
          <h1>Selected</h1>
          <p>Store Number : {this.state.selectedStore.storeNumber}</p>
          <p>Store Address : {this.state.selectedStore.address.street} - {this.state.selectedStore.address.city}, {this.state.selectedStore.address.province} </p>
          <p>Phone Number: {this.state.selectedStore.phoneNumber}</p>
          <button onClick={this.handleEditButton}>Edit</button>
        </div>
      );
    } else if (this.state.view === "edit"){
      page = ( 
        <div>
          <h1>Edit</h1>
          <form  onSubmit={this.handleEditStore}>
            <label>
              Store Number:
              <input type="text" name="storeNumber" value={this.state.tempStore.storeNumber} onChange={this.handleFormChange}/>
            </label>
            <label>
              Street:
              <input type="text" name="street" value={this.state.tempStore.address.street} onChange={this.handleFormChange}/>
            </label>
            <label>
              City:
              <input type="text" name="city" value={this.state.tempStore.address.city} onChange={this.handleFormChange}/>
            </label>
            <label>
              Province:
              <input type="text" name="province" value={this.state.tempStore.address.province} onChange={this.handleFormChange}/>
            </label>
            <label>
              Phone Number:
              <input type="text" name="phoneNumber" value={this.state.tempStore.phoneNumber} onChange={this.handleFormChange}/>
            </label>
            <input type="submit" value="Edit Part" />
          </form>

        </div>
      );
    } else if (this.state.view === "add"){
      page = (
        <div>
          <h1>Add Store</h1>
          <form  onSubmit={this.handleAddStore}>
            <label>
              Store Number:
              <input type="text" name="storeNumber" onChange={this.handleFormChange}/>
            </label>
            <label>
              Street:
              <input type="text" name="street" onChange={this.handleFormChange}/>
            </label>
            <label>
              City:
              <input type="text" name="city" onChange={this.handleFormChange}/>
            </label>
            <label>
              Province:
              <input type="text" name="province" onChange={this.handleFormChange}/>
            </label>
            <label>
              Phone Number:
              <input type="text" name="phoneNumber" onChange={this.handleFormChange}/>
            </label>
 
            <input type="submit" value="Add Store" />
          </form>
        </div>
      );
    }

    return (
    	<div>
        {page}
      </div>
    );
  }
}
export default Stores;
/*



      this.handleAddPart = this.handleAddPart.bind(this);
      this.handleEditPart = this.handleEditPart.bind(this);

      this.handleFormChange = this.handleFormChange.bind(this);
      this.selectedPartChange = this.selectedPartChange.bind(this);

      

    }




      fetch('/part', requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data.status !== 'error'){
          this.setState({selectedPart: data.data});
          this.setState({view: "select"});
          }else {
            alert("Error adding the part to the database");

          }
        });

    event.preventDefault();
    }






  render () {
    let page;

     else if (this.state.view === "add"){
      page = (
        <div>
          <h1>Add Part</h1>
          <form  onSubmit={this.handleAddPart}>
            <label>
                  SKU:
                  <input type="text" name="sku" onChange={this.handleFormChange}/>
              </label>
              <label>
                  Name:
                  <input type="text" name="name" onChange={this.handleFormChange}/>
              </label>
              <label>
                  Description:
                  <input type="text" name="desc" onChange={this.handleFormChange}/>
              </label>
            <input type="submit" value="Add Part" />
          </form>
        </div>);
   */
