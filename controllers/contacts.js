const { Contact } = require("../schema");
const { HttpError, ctrlWrapper } = require("../helpers");

//Search all contacts in the database
const listContacts = async (req, res) => {
	const contacts = await Contact.find();
	res.json(contacts);
};

//search for contact by id
const getContactById = async (req, res) => {
	const { contactId } = req.params;

	const contact = await Contact.findById(contactId);
	if (!contact) {
		throw HttpError(404, "Not found");
	}
	res.json(contact);
};

//add new contact to the database
const addContact = async (req, res) => {
	const newContact = await Contact.create(req.body);
	res.status(201).json(newContact);
};

//remove contact
const removeContact = async (req, res) => {
	const { contactId } = req.params;
	const removeBook = await Contact.findByIdAndDelete(contactId);
	console.log(removeBook);
	if (!removeBook) {
		throw HttpError(404, "Not found");
	}
	res.json({ message: "Remove success" });
};

//update contact by id
const updateContactById = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

//update the favorite field in contact
const updateStatusContact = async (req, res) => {
	const { contactId } = req.params;

	const result = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

module.exports = {
	listContacts: ctrlWrapper(listContacts),
	getContactById: ctrlWrapper(getContactById),
	addContact: ctrlWrapper(addContact),
	removeContact: ctrlWrapper(removeContact),
	updateContactById: ctrlWrapper(updateContactById),
	updateStatusContact: ctrlWrapper(updateStatusContact),
};
