const { Contact } = require('../models/contact');

const getContacts = async () => {
	const contacts = await Contact.find();
	return contacts;
};

const getContactById = async (id) => {
	const contact = await Contact.findById(id);
	return contact;
};

const addContact = async (body) => {
	const contact = new Contact(body);
	const postedContact = await contact.save();
	return postedContact;
};

const updateContactById = async (id, body) => {
	const contact = await Contact.
		findByIdAndUpdate(id,
			{ $set: body },
			{ returnDocument: 'after' });

	return contact;
};

const removeContactById = async (id) => {
	const deletedContact = await Contact.findByIdAndDelete(id);

	return deletedContact;
};

const updateStatusContactById = async (id, body) => {
	return updateContactById(id, body);
};

module.exports = {
	getContacts,
	getContactById,
	addContact,
	updateContactById,
	removeContactById,
	updateStatusContactById
}
