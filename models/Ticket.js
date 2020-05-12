var mongoose = require('mongoose');

const Ticket = new mongoose.Schema({
	//sku: {type: String},
	//ticketNumber: {Type: Number} //DEV NOTE - It would be nice to have this value increment when a ticket is created
	storeID: {Type: Number},
	desc: {Type: String},
	createDate: {Type: Date},
	editDate: {Type: Date},
	closedDate: {Type: Date},
	partsList: [{ sku: {Type: String}}],
	Notes: [ {body: {Type:String}, date: {Type: Date}}]
});

module.exports = mongoose.model('Ticket', Ticket);
