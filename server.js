const express = require('express');
const app = express();

// require bodyParser
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
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
	.catch(err => {
		res.json({data: err});
	})
});

app.post('/part', (req, res) => {
/*	db.parts.insert(req.body, (err, result) => {
		if(err) res.json({reply: "error"});
		else {
			res.json({reply: "added", id: result._id});
		}
	});*/
});

const port = 5000;
app.listen(port, () => console.log(`server started on ${port}`));
