const Contacts = require("../schemata/contactSchema");

const listContacts = async () => {
	try {
		const contacts = await Contacts.find();
		return contacts;
	} catch (error) {
		console.log(error.message);
	}
};

const getContactById = async (contactId) => {
	try {
		const contact = await Contacts.findById(contactId);
		return contact;
	} catch (error) {
		console.log(error.message);
	}
};

const removeContact = async (contactId) => {
	try {
		const deletedContact = await Contacts.deleteOne({ _id: contactId });
		return deletedContact;
	} catch (error) {
		console.log(error.message);
	}
};

const addContact = async (body) => {
	try {
		const { name, email, phone } = body;
		const contact = new Contacts({ name, email, phone });
		await contact.save();
		return contact;
	} catch (error) {
		console.log(error.message);
	}
};

const updateContact = async (contactId, body) => {
	try {
		const filter = { _id: contactId };
		const contact = await Contacts.findOneAndUpdate(filter, body, {
			returnDocument: "after",
		});
		return contact;
	} catch (error) {
		console.log(error.message);
	}
};

const updateStatusContact = async (contactId, body) => {
	try {
		const filter = { _id: contactId };
		const update = { favorite: body };

		const contact = await Contacts.findOneAndUpdate(filter, update, {
			returnDocument: "after",
		});
		console.log(contact);
		return contact;
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
	updateStatusContact,
};
