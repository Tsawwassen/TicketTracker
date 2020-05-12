var mongoose = require('mongoose');

const Ticket = new mongoose.Schema({
	//ticketNumber: {Type: Number} //DEV NOTE - It would be nice to have this value increment when a ticket is created
	storeNumber: {type: Number},
	desc: {type: String},
	createDate: {type: String},
	editDate: {type: String},
	closedDate: {type: String},
	partsList: [{ sku: {type: String}}],
	notes: [ {body: {type:String}, date: {type: Date}}]
});

module.exports = mongoose.model('Ticket', Ticket);
