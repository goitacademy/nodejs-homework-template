// const contacts = require("../models/contacts");
const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (_, res) => {
	const result = await Contact.find();
	res.status(200).json(result);
};

// const getOneContactById = async (req, res) => {
// 	const { contactId } = req.params;
// 	const result = await contacts.getContactById(contactId);

// 	if (!result) {
// 		throw HttpError(404, "Not found");
// 	}
// 	res.status(200).json(result);
// };
const getOneContactById = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findById(contactId);

	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json(result);
};

// const addNewContact = async (req, res) => {
// 	const result = await contacts.addContact(req.body);
// 	res.status(201).json(result);
// };
const addNewContact = async (req, res) => {
	const result = await Contact.create(req.body);

	res.status(201).json(result);
};

// const updateById = async (req, res) => {
// 	const { contactId } = req.params;
// 	const result = await contacts.updateContact(contactId, req.body);
// 	if (!result) {
// 		throw HttpError(404, "Not found");
// 	}
// 	res.status(200).json(result);
// };

// const deleteContact = async (req, res) => {
// 	const { contactId } = req.params;
// 	const result = await contacts.removeContact(contactId);

// 	if (!result) {
// 		throw HttpError(404, "Not found");
// 	}

// 	res.status(200).json({ message: "Contact deleted" });
// };

module.exports = {
	getAllContacts: ctrlWrapper(getAllContacts),
	getOneContactById: ctrlWrapper(getOneContactById),
	addNewContact: ctrlWrapper(addNewContact),
	// updateById: ctrlWrapper(updateById),
	// deleteContact: ctrlWrapper(deleteContact),
};
