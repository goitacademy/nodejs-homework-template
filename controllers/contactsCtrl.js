const {contactsService} = require("../models");
const {ctrlWrapper} = require("../decorators");
const {HttpError} = require("../utils");

const getAllContacts = async (req, res) => {
	const result = await contactsService.listContacts();
	res.json(result);
};

const getContact = async (req, res) => {
	const {contactId} = req.params;

	const result = await contactsService.getContactById(contactId);
	if (!result) throw HttpError(404);

	res.json(result);
};

const addContact = async (req, res) => {
	const result = await contactsService.addContact(req.body);
	res.status(201).json(result);
};

const updateContact = async (req, res) => {
	const {contactId} = req.params;

	const result = await contactsService.updateContact(contactId, req.body);
	if (!result) throw HttpError(404);

	res.json(result);
};

const deleteContact = async (req, res) => {
	const {contactId} = req.params;

	const result = await contactsService.removeContact(contactId);
	if (!result) throw HttpError(404);

	res.json({message: "contact deleted"});
};

module.exports = {
	getAllContacts: ctrlWrapper(getAllContacts),
	getContact: ctrlWrapper(getContact),
	addContact: ctrlWrapper(addContact),
	updateContact: ctrlWrapper(updateContact),
	deleteContact: ctrlWrapper(deleteContact),
};
