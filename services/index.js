const Contact = require("./schemas/contacts");
const User = require("./schemas/user");

const getAllContacts = async () => {
	return Contact.find();
};

const getContactById = (id) => {
	return Contact.findOne({ _id: id });
};

const createContact = ({ name, email, phone }) => {
	return Contact.create({ name, email, phone });
};

const updateContact = (id, { name, email, phone }) => {
	return Contact.findByIdAndUpdate({ _id: id }, { name, email, phone });
};

const removeContact = (id) => {
	return Contact.findByIdAndRemove({ _id: id });
};

const updateStatusContact = (id, { favorite }) => {
	return Contact.findByIdAndUpdate({ _id: id }, { $set: { favorite } });
};

module.exports = {
	getAllContacts,
	getContactById,
	createContact,
	updateContact,
	removeContact,
	updateStatusContact,
};
