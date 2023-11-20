const Contact = require('../models/contact.schema');

const getAll = async () => {
	return Contact.find();
};

const getContactsQuery = async (page, limit, favorite) => {
	let query = Contact.find();
	if (favorite !== undefined) {
		query = query.find({ favorite: favorite });
	}
	return query
		.skip((page - 1) * limit)
		.limit(limit)
		.exec();
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
	getContactsQuery,
	getById,
	createContact,
	updateContact,
	updateFavorite,
	removeContact,
};
