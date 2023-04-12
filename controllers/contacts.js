const { controllerWrp, httpError } = require("../helpers");
const { Contact } = require("../models/contactSchema");

const getAllContacts = async (req, res) => {
	const contacts = await Contact.find();
	res.json(contacts);
};

const getById = async (req, res) => {
	const { contactId } = req.params;
	const contact = await Contact.findById(contactId);
	if (!contact) {
		throw httpError(404, "Not found");
	}
	res.status(200).json(contact);
};

const addContact = async (req, res) => {
	const contact = await Contact.create(req.body);
	res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
	const { contactId } = req.params;
	const contact = await Contact.findByIdAndRemove(contactId);
	if (!contact) {
		throw httpError(404, "Not found");
	}
	res.status(200).json({ message: "contact deleted" });
};

const changeContact = async (req, res) => {
	const contact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
	if (!contact) {
		throw httpError(404, "Not found");
	}
	res.status(200).json(contact);
};

const updateContactFavorite = async (req, res) => {
	const contact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
	if (!contact) {
		throw httpError(404, "Not found");
	}
	res.status(200).json(contact);
};
module.exports = {
	getAllContacts: controllerWrp(getAllContacts),
	getById: controllerWrp(getById),
	addContact: controllerWrp(addContact),
	deleteContact: controllerWrp(deleteContact),
	changeContact: controllerWrp(changeContact),
	updateContactFavorite: controllerWrp(updateContactFavorite),
};
