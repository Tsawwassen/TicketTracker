var mongoose = require('mongoose');

const Store = new mongoose.Schema({
	storeNumber: {type: Number},
	address: { street: {type: String},
				city: {type: String},
				province: {type: String}
			},
	phoneNumber: {type: Number}

});

module.exports = mongoose.model('Store', Store);

/** Easy copy/past of model in JSON format
	
	_id: "",
	storeNumber:"",
	address: { street: "",
				city: "",
				province:""
			},
	phoneNumber: ""

**/