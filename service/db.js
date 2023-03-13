const Contacts = require("../schemas/contacts");

const getAllContacts = async () => {
	return Contacts.find();
};

const getContactsById = id => {
	return Contacts.findById(id);
};

const createContacts = newContact => {
	return Contacts.create(newContact);
};

const updateContacts = (id, fields) => {
	return Contacts.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeContacts = id => {
	return Contacts.findByIdAndRemove(id);
};

module.exports = {
	getAllContacts,
	getContactsById,
	createContacts,
	updateContacts,
	removeContacts,
};
