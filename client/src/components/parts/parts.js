import React, { Component } from 'react';

class Parts extends Component {

  	constructor(props){
	    super(props);
	    this.state = {
	    	view: "default",
	    	selectedPart: {
	    		id:"",
	    		sku:"",
	    		name:"",
	    		desc:"",
	    	},
	    	newPart: {
	    		id:"",
	    		sku:"",
	    		name:"",
	    		desc:"",
	    	}

    	};
  
		this.handleSelect = this.handleSelect.bind(this);
		this.handleAdd = this.handleAdd.bind(this);

	    this.handleAddPart = this.handleAddPart.bind(this);
	    this.handleEditClick = this.handleEditClick.bind(this);

	    this.handleChange = this.handleChange.bind(this);

  	}

  	handleSelect(event){
  		alert("part selected");
  		event.preventDefault();
  	}

	handleAdd(event){
	  	this.setState({view: "add"});
	}

  	handleAddPart(event){
	  	this.setState({selectedPart: this.state.newPart});
	  	this.setState({view: "select"});
	  	// TODO : send new part to database to be added
	  	event.preventDefault();
  	}

  	handleEditClick(event){
  		alert("edit button clicked");
  		event.preventDefault();
  	}

  	handleChange(event){
  		let partChange = this.state.newPart;

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
  		this.setState({newPart: partChange});
  		console.log(this.state.newPart);
  	}

  render () {
  	let page;

  	if(this.state.view === "default"){
  		page = (<div><h1>Parts</h1>
		    	<form onSubmit={this.handleSelect}>
			    	<label>
			    		Select a part to view
			    		<select>
			    			<option value="1">Option 1</option>
			    		</select>
			    	</label>
			    	<br />
		    		<input type="submit" value="Select" />
		    	</form>
		    	<button onClick={this.handleAdd}>Add</button></div>);
  	} else if (this.state.view === "add"){
  		page = (
  			<div>
  				<h1>Add Part</h1>
  				<form  onSubmit={this.handleAddPart}>
  					<label>
			          	SKU:
			          	<input type="text" name="sku" onChange={this.handleChange}/>
			        </label>
			        <label>
			          	Name:
			          	<input type="text" name="name" onChange={this.handleChange}/>
			        </label>
			        <label>
			          	Description:
			          	<input type="text" name="desc" onChange={this.handleChange}/>
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
  				<p>Descriptoin : {this.state.selectedPart.desc}</p>
  				<button onClick={this.handleEditClick}>Edit</button>
  			</div>);
  	}
    return (
    	<div>
    		{page}
	    </div>
    );
  }
}

export default Parts;