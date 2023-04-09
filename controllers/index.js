const controllerWrp = require("../helpers/controllerWrp");
const getAllContacts = require("./getAllContacts");
const getById = require("./getById");
const postContact = require("./postContact");
const deleteContact = require("./deleteContact.js");
const changeContact = require("./changeContact.js");

module.exports = {
	getAllContacts: controllerWrp(getAllContacts),
	getById: controllerWrp(getById),
	postContact: controllerWrp(postContact),
	deleteContact: controllerWrp(deleteContact),
	changeContact: controllerWrp(changeContact),
};
