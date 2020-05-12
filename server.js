/*********************************************************************************************************************
*
* Ticket Tracker Server
* ----------------
* API used to receive requests from the React app, and return requested information form the Database (MongoDB)
*
************************************************************************************************************************/


const express = require('express');
const app = express();

//BodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tta', {useNewUrlParser: true});

//Models
var Parts = require('./models/Part');
var Stores = require('./models/Store');
var Tickets = require('./models/Ticket');

app.get('/', (req, res) => {
	res.send("Hello World");
});

app.get('/parts', (req, res) => {
	Parts.find(req.query)
	.then(parts => {
		res.json({data: parts});
	})
	.catch(error => {
		res.json({status: "error", data: error});
	});
});

app.get('/parts/:id', (req, res) => {
	Parts.findById(req.params.id)
	.then(part => {
		//success
		res.json({status: "success", data: part});
	})
	.catch(error => {
		//error
		res.json({status: "error", data: error});
	})
})

app.post('/part', (req, res) => {

	Parts.create(req.body)
	.then(parts => {
		res.json({status: "success", data: parts});
	})
	.catch(error => {
		res.json({status: "error", data: error});
	});
});

app.put('/part', (req, res) => {

	Parts.findByIdAndUpdate(req.body._id, req.body, {new: true})
	.then(part => {
		res.json({status: "success", data: part});
	})
	.catch(error => {
		res.json({status: "error", data: error});
	})
});

app.get('/stores', (req, res) => {
	Stores.find(req.query)
	.then(stores => {
		res.json({status: "success", data: stores});
	})
	.catch(error => {
		res.json({status: "error", data: error});
	});
});

app.get('/stores/:id', (req, res) => {
	Stores.findById(req.params.id)
	.then(store => {
		//success
		res.json({status: "success", data: store});
	})
	.catch(error => {
		//error
		res.json({status: "error", data: error});
	})
})

app.put('/store', (req, res) => {
	Stores.findByIdAndUpdate(req.body._id, req.body, {new: true})
	.then(store => {
		res.json({status: "success", data: store});
	})
	.catch(error => {
		res.json({status: "error", data: error});
	})
});

app.post('/store', (req, res) => {
	Stores.create(req.body)
	.then(stores => {
		res.json({status: "success", data: stores});
	})
	.catch(error => {
		res.json({status: "error", data: error});
	});
});

app.get('/ticket/:id', (req, res) => {
	Tickets.findById(req.params.id)
	.then(ticket => {
		res.json({status: "success", data: ticket});
	})
	.catch(error => {
		res.json({status: "error", data: error});
	});

});

app.get('/tickets', (req, res) => {
	Tickets.find(req.query)
	.then(tickets => {
		res.json({status: "success", data: tickets});
	})
	.catch(error => {
		res.json({status: "error", data: error});
	});
});

app.post('/ticket', (req, res) => {
	req.body.storeNumber = parseInt(req.body.storeNumber);

	Tickets.create(req.body)
	.then(ticket => {
		res.json({status: "success", data: ticket});
	})
	.catch(error =>{
		res.json({status: "error", data: error});
	});
});

const port = 5000;
app.listen(port, () => console.log(`server started on ${port}`));
