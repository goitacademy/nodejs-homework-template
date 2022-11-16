const { Contacts } = require("../models/contactSchema");

const listContactsController = async (req, res) => {
	const contact = await Contacts.find({});
	res.json({ contact });
};
const getContactByIdController = async (req, res) => {
	const { contactId } = req.params;
	const contact = await Contacts.findById(contactId);

	if (!contact) {
		res.status(404).json({ message: "Not found" });
		return;
	}
	res.json({ contact });
};
const removeContactController = async (req, res) => {
	const { contactId } = req.params;
	const deletedContact = await Contacts.findByIdAndRemove(contactId);
	deletedContact
		? res.json({ message: "contact deleted" })
		: res.status(404).json({ message: "Not found" });
};

const addContactController = async (req, res) => {
	const contact = new Contacts(req.body);
	const newContact = await contact.save();
	res.json({ newContact });
};
const updateContactController = async (req, res) => {
	const { contactId } = req.params;
	await Contacts.findByIdAndUpdate(
		contactId,
		{ $set: req.body },
		{ new: true }
	);
	const changedContact = await Contacts.findById(contactId);
	if (changedContact) {
		return res.json({ changedContact });
	} else {
		return res.status(404).json({ message: "Not found" });
	}
};
const updateStatusContactController = async (req, res) => {
	const { contactId } = req.params;
	const { favorite } = req.body;

	await Contacts.findByIdAndUpdate(contactId, { favorite }, { new: true });
	const updatedContact = await Contacts.findById(contactId);
	if (updatedContact) {
		return res.json({ updatedContact });
	} else {
		return res.status(404).json({ message: "Not found" });
	}
};

module.exports = {
	listContactsController,
	getContactByIdController,
	removeContactController,
	addContactController,
	updateContactController,
	updateStatusContactController,
};
