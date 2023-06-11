const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
	const result = await Contact.find();
	res.json(result);
};

const getContactById = async (req, res) => {
	const { contactId } = req.params;
	console.log("req.params :>> ", req.params);
	const result = await Contact.findById(contactId);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
};

const addContact = async (req, res) => {
	const result = await Contact.create(req.body);
	res.status(201).json(result);
};

const changeContact = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
};

const updateStatusContact = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});
	console.log("updateStatusContact >> result:", result);

	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
};

const removeContact = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndDelete(contactId);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json({ message: "Contact deleted" });
};

module.exports = {
	listContacts: ctrlWrapper(listContacts),
	getContactById: ctrlWrapper(getContactById),
	addContact: ctrlWrapper(addContact),
	changeContact: ctrlWrapper(changeContact),
	updateStatusContact: ctrlWrapper(updateStatusContact),
	removeContact: ctrlWrapper(removeContact),
};
