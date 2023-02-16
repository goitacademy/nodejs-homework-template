const { v4: uuidv4 } = require("uuid");
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require("../models/contacts");

const getAllContacts = async (req, res) => {
	const getContacts = await listContacts();
	res.status(200).json(getContacts);
}

const getOneContactById = async (req, res) => {
	const { contactId } = req.params;
	const getContact = await getContactById(contactId);
	if (getContact) {
		res.status(200).json(getContact);
	} else {
		res.status(404).json({ message: "Not found" });
	}
}

const postNewContact = async (req, res) => {
	const { name, email, phone } = req.body;
	await addContact({
		id: uuidv4(),
		name,
		email,
		phone,
	});
	res.status(201).json({ message: "new contact added" });
}
const removeContactById = async (req, res) => {
	const { contactId } = req.params;
	if (contactId) {
		await removeContact(contactId);
		res.status(200).json({ message: "contact deleted" });
	} else {
		res.status(400).json({ message: "Not found" });
	}
}

const changeContactById = async (req, res) => {
	const { contactId } = req.params;
	const { name, email, phone } = req.body;
	if (!name || !email || !phone) {
		res.status(400).json({ message: "missing fields" });
	} else {
		const renewContact = await updateContact(contactId, {
			name,
			email,
			phone,
		});
		if (renewContact) {
			res.status(200).json({ message: "Contact Updated" });
		} else {
			res.status(404).json({ message: "Not found" });
		}
	}
}

module.exports = {
  getAllContacts,
  getOneContactById,
  postNewContact,
  removeContactById,
  changeContactById
}