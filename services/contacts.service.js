const Contact = require('../models/contact.schema');

const getAll = async () => {
	return Contact.find();
};

const getById = async contactId => {
	return Contact.findById(contactId);
};

const createContact = async body => {
	return Contact.create(body);
};

const updateContact = async (contactId, body) => {
	return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateFavorite = async (contactId, favorite) => {
	return Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
};

const removeContact = async contactId => {
	return Contact.findByIdAndDelete(contactId);
};

module.exports = {
	getAll,
	getById,
	createContact,
	updateContact,
	updateFavorite,
	removeContact,
};
