const express = require('express');
const app = express();

// require bodyParser
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


//Database
var mongojs = require('mongojs');
//Used the create ObjectID to search the _id field
var ObjectId = require('mongojs').ObjectID;
var db = mongojs('tta', ['stores', 'parts', 'tickets']);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginapp');

app.get('/', (req, res) => {
	res.send("Hello World");
});

app.post('/part', (req, res) => {
	db.parts.insert(req.body, (err, result) => {
		if(err) res.json({reply: "error"});
		else {
			res.json({reply: "added", id: result._id});
		}
	});
});

const port = 5000;
app.listen(port, () => console.log(`server started on ${port}`));
