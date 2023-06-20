const Contact = require("./schemas/contactSchema");

const getContactList = async () => {
	return Contact.find();
};

const getContactById = (contactId) => {
	return Contact.findOne({ _id: contactId });
};

const addContact = ({ name, phone, email }) => {
	return Contact.create({ name, phone, email });
};

const updateContact = ({ name, phone, email }, { contactId }) => {
	return Contact.findOneAndUpdate({ _id: contactId }, { name, phone, email });
};

const removeContact = (contactId) => {
	return Contact.findOneAndDelete({ _id: contactId });
};

const isFavorite = (contactId, favorite) => {
	return Contact.findOneAndUpdate({ _id: contactId }, { $set: favorite }, { upsert: true });
};

module.exports = {
	getContactList,
	getContactById,
	addContact,
	updateContact,
	removeContact,
	isFavorite,
};
