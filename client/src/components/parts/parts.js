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
	    		sku:"",
	    		name:"",
	    		desc:"",
	    	},
	    	partsList: []

    	};
  
		this.handleSelect = this.handleSelect.bind(this);
		this.handleAdd = this.handleAdd.bind(this);

	    this.handleAddPart = this.handleAddPart.bind(this);
	    this.handleEditClick = this.handleEditClick.bind(this);

	    this.handleChange = this.handleChange.bind(this);
	    this.selectedPartChange = this.selectedPartChange.bind(this);

  	}

  	componentDidMount(){
    	fetch('/parts')
      	.then(res => res.json())
      	.then(parts => this.setState({partsList: parts}));
      	//
      	//
  	}

  	selectedPartChange(event){
  		let activePart = this.state.selectedPart;
  		activePart.id = event.target.value;
  		console.log(activePart);
  		this.setState({selectedPart: activePart});
  	}

  	handleSelect(event){
  		//alert("part selected");
  		//console.log(event.target.value);

  		//Get part information from database
  		//Set part info on selectedPart
  		//Render select page

  		
  		event.preventDefault();
  	}

	handleAdd(event){
	  	this.setState({view: "add"});
	  	//
	}

  	handleAddPart(event){

  		let partToAdd = this.state.newPart

  		const requestOptions = {
      		method: 'POST',
      		headers: { 'Content-Type': 'application/json' },
      		body: JSON.stringify(partToAdd)
    	};

    	fetch('/part', requestOptions)
        .then(response => response.json())
        .then(data => {
        	if(data.reply !== 'error'){
         		partToAdd.id = data.id
	  			this.setState({selectedPart: partToAdd});
	  			this.setState({view: "select"});
         	}else {
         		alert("Error adding the part to the database");

         	}
        });

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
			    		<select onChange={this.selectedPartChange}>
			    			{this.state.partsList.map( part => 
            					<option key={part._id} value={part._id}>{part.sku}</option>
			    			)}
			    			
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
  				<p>Description : {this.state.selectedPart.desc}</p>
  				<p>ID : {this.state.selectedPart.id}</p>
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