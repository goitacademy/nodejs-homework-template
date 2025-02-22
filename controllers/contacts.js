const {HttpError, ctrlWrapper} = require("../helpers");
const {Contact} = require("../models/cotact");

const listContacts = async (req, res) => {	
	const result = await Contact.find({}, "-updatedAt -createdAt ");
	res.json(result);	
};

const getContactById = async (req, res) => {
	const {contactId} = req.params;
	const result = await Contact.findById(contactId);
	if(!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);	
};

const addContact = async (req, res) => {
	const result = await Contact.create(req.body);
	res.status(201).json(result);	
};

const removeContact = async (req, res) => {	
	const {contactId} = req.params;
	const result = await Contact.findByIdAndRemove(contactId, req.body);
	if(!result) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json({message: "contact deleted"});
};

const updateContact = async (req, res) => {
	const {contactId} = req.params;
	const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
	if(!result) {
		throw HttpError(400, "Not found");
	}
	res.json(result);
};

const updateStatusContact = async (req, res) => {
	const {contactId} = req.params;
	const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
	if(!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

module.exports = {
	listContacts: ctrlWrapper(listContacts),
	getContactById: ctrlWrapper(getContactById),
	addContact: ctrlWrapper(addContact),
	removeContact: ctrlWrapper(removeContact),
	updateContact: ctrlWrapper(updateContact),
	updateStatusContact: ctrlWrapper(updateStatusContact),
}