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

    this.selectedStoreChange = this.selectedStoreChange.bind(this);
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
    console.log("Select button pressed");
    /** TODO **/
    event.preventDefault();
  }

  handleAddButton(event){
    console.log("add button pressed");
    /** TODO **/
    event.preventDefault();
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

  
  this.handleSelectButton = this.handleSelectButton.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
    this.handleEditButton = this.handleEditButton.bind(this);

      this.handleAddPart = this.handleAddPart.bind(this);
      this.handleEditPart = this.handleEditPart.bind(this);

      this.handleFormChange = this.handleFormChange.bind(this);
      this.selectedPartChange = this.selectedPartChange.bind(this);

      

    }


    selectedPartChange(event){
      let activePart = this.state.selectedPart;
      activePart._id = event.target.value;
      this.setState({selectedPart: activePart});
    }

    handleSelectButton(event){
      fetch('/parts/' + this.state.selectedPart._id)
        .then(res => res.json())
        .then(part => {
          this.setState({selectedPart: part.data});
          this.setState({view: "select"});
        });
      
      event.preventDefault();
    }

  handleAddButton(event){
      this.setState({view: "add"});
  }

    handleAddPart(event){
      let partToAdd = this.state.tempPart
      delete partToAdd._id;
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(partToAdd)
      };

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

    handleEditButton(event){
      
      this.setState({view: "edit"});
      this.setState({tempPart: this.state.selectedPart});
      event.preventDefault();
    }

    handleEditPart(event){
      let partToUpdate = this.state.tempPart;

      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(partToUpdate)
      };

      fetch('/part', requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data.status !== 'error'){
            this.setState({selectedPart: data.data});
            this.setState({view: "select"});
          }else {
            alert("Error updating the part to the database");
          }
        });
      event.preventDefault();
    }

    handleFormChange(event){
      let partChange = this.state.tempPart;

      switch(event.target.name){
        case "sku":
          partChange.sku = event.target.value; break;
        case "name":
          partChange.name = event.target.value; break;
        case "desc":
          partChange.desc = event.target.value; break;
        default:
          console.log("Error, form name is not defined"); break;
      }
      this.setState({tempPart: partChange});
 
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
    } else if (this.state.view === "select"){
      page = (
        <div>
          <h1>Selected</h1>
          <p>SKU : {this.state.selectedPart.sku}</p>
          <p>Name : {this.state.selectedPart.name}</p>
          <p>Description : {this.state.selectedPart.desc}</p>
          <p>ID : {this.state.selectedPart._id}</p>
          <button onClick={this.handleEditButton}>Edit</button>
        </div>);
    } else if (this.state.view === "edit"){
      page = ( 
        <div>
          <h1>Edit</h1>
          <form  onSubmit={this.handleEditPart}>
            <label>
                  SKU:
                  <input type="text" name="sku" value={this.state.tempPart.sku} onChange={this.handleFormChange}/>
              </label>
              <label>
                  Name:
                  <input type="text" name="name" value={this.state.tempPart.name} onChange={this.handleFormChange}/>
              </label>
              <label>
                  Description:
                  <input type="text" name="desc" value={this.state.tempPart.desc} onChange={this.handleFormChange}/>
              </label>
            <input type="submit" value="Edit Part" />
          </form>

        </div>);
    }
    return (
      <div>
        {page}
      </div>
    );
  }
}

export default Parts;*/