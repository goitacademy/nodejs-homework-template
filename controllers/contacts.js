const Contact = require("../models/contacts");

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (id) => {
	const contacts = await listContacts();
	const result = Contact.findById(id);
	if (!result) {
		return null
	}
	return result
};

const removeContact = async (id) => {
  const deleteContact = await Contact.findByIdAndRemove(id);
  return deleteContact;
};

const addContact = async ({ name, email, phone }) => {
	const newContact = await Contact.create({ name, email, phone });
	return newContact;
};

const updateContact = async (id, body) => {
  const updateNewContact = await Contact.findByIdAndUpdate(id, body, { new: true });
  return updateNewContact;
};

const updateStatusContact = async(id, body) => {
  const updateNewContact = await Contact.findByIdAndUpdate(id, body, { new: true });
  return updateNewContact;
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
	updateStatusContact,
};