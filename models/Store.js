var mongoose = require('mongoose');

const Store = new mongoose.Schema({
	//sku: {type: String},
	storeNumber: {type: Number},
	address: { street: {type: String},
				city: {type: String},
				province: {type: String}
			},
	phoneNumber: {type: Number}

});

module.exports = mongoose.model('Store', Store);