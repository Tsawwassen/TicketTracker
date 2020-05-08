var mongoose = require('mongoose');

const Part = new mongoose.Schema({
	sku: {type: String},
	name: {type: String},
	desc: {type: String}
});

module.exports = mongoose.model('Part', Part);