const { Contacts } = require("./contactSchema");

const listContacts = async () => {
	const contacts = await Contacts.find({});
	return contacts;
};

const getContactById = async (contactId) => {
	const getById = await Contacts.findById(contactId);
	return getById;
};

const removeContact = async (contactId) => {
	const removeById = await Contacts.findByIdAndRemove(contactId);

	return removeById;
};

const addContact = async (body) => {
	const contact = new Contacts(body);
	const newContact = await contact.save();

	return newContact;
};

const updateContact = async (contactId, body) => {
	await Contacts.findByIdAndUpdate(contactId, {
		$set: body,
	});
	const changedContact = await Contacts.findById(contactId);
	return changedContact;
};

const updateStatusContact = async (contactId, favorite) => {
	await Contacts.findByIdAndUpdate(contactId, { $set: favorite });
	const changedContact = await Contacts.findById(contactId);
	return changedContact;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
	updateStatusContact,
};
