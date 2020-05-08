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
		console.log(parts);
		res.json({status: "success", data: parts});
	})
	.catch(error => {
		res.json({status: "error", data: error});
	});
});

app.put('/part', (req, res) => {

	Parts.findByIdAndUpdate(req.body._id, req.body, {new: true})
	.then(profile => {
		res.json({status: "success", data: profile});
	})
	.catch(error => {
		res.json({status: "error", data: error});
	})
});

const port = 5000;
app.listen(port, () => console.log(`server started on ${port}`));
