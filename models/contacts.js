const fs = require("fs/promises");
const path = require("path");

const Contact = require("../contactSchema");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
	try {
		const contacts = await Contact.find();
		return JSON.parse(contacts);
	} catch (error) {
		console.log(error.message);
	}
};

const getContactById = async (contactId) => {
	try {
		const resp = await fs.readFile(contactsPath);
		const contacts = JSON.parse(resp);
		const contact =
			contacts.find((contact) => contact.id === contactId) || null;
		return contact;
	} catch (error) {
		console.log(error.message);
	}
};

const removeContact = async (contactId) => {
	try {
		const resp = await fs.readFile(contactsPath);
		const contacts = JSON.parse(resp);
		const contactIndex = contacts.findIndex(
			(contact) => contact.id === contactId
		);
		let isInArray;
		contactIndex === -1 ? (isInArray = false) : (isInArray = true);
		if (isInArray) {
			contacts.splice(contactIndex, 1);
			await fs.writeFile(contactsPath, JSON.stringify(contacts));
		}

		return isInArray;
	} catch (error) {
		console.log(error.message);
	}
};

const addContact = async (body) => {
	try {
		const { name, email, phone } = body;
		const contact = new Contact({ name, email, phone });
		await contact.save();

		return contact;
	} catch (error) {
		console.log(error.message);
	}
};

const updateContact = async (contactId, body) => {
	try {
		const resp = await fs.readFile(contactsPath);
		const contacts = JSON.parse(resp);
		const index = contacts.findIndex((contact) => contact.id === contactId);

		if (index === -1) {
			return null;
		}

		contacts[index] = { ...contacts[index], ...body };
		await fs.writeFile(contactsPath, JSON.stringify(contacts));

		return contacts[index];
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
};
