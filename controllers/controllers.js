const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
	updateStatusContact,
} = require("../models/contacts");

const listContactsController = async (req, res) => {
	const contacts = await listContacts();
	res.json({ contacts });
};
const getContactByIdController = async (req, res) => {
	const { contactId } = req.params;
	const contact = await getContactById(contactId);

	if (!contact) {
		res.status(404).json({ message: "Not found" });
		return;
	}
	res.json({ contact });
};
const removeContactController = async (req, res) => {
	const { contactId } = req.params;
	const deletedContact = await removeContact(contactId);
	deletedContact
		? res.json({ message: "contact deleted" })
		: res.status(404).json({ message: "Not found" });
};

const addContactController = async (req, res) => {
	if ("favorite" in req.body === false) {
		req.body.favorite = false;
	}
	const contact = await addContact(req.body);
	res.json({ contact });
};
const updateContactController = async (req, res) => {
	const { contactId } = req.params;
	const changedContact = await updateContact(contactId, req.body);
	if (changedContact) {
		return res.json({ changedContact });
	} else {
		return res.status(404).json({ message: "Not found" });
	}
};
const updateStatusContactController = async (req, res) => {
	const { contactId } = req.params;
	const updatedContact = await updateStatusContact(contactId, req.body);
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
