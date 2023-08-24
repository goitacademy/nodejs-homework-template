const fs = require("fs");
const path = require("node:path");
const { v1: uuidv1 } = require("uuid");

const pathContacts = path.join(__dirname, "contacts.json");
console.log(pathContacts);

const listContacts = async () => {
	try {
		return fs.readFileSync(pathContacts);
	} catch (err) {
		console.log(err.message);
	}
};

const getContactById = (contactId) => {
	try {
		const data = JSON.parse(fs.readFileSync(pathContacts));
		const oneContact = data.find((item) => item.id === contactId);
		return oneContact;
	} catch (err) {
		console.log(err);
	}
};

const removeContact = (contactId) => {
	try {
		const data = JSON.parse(fs.readFileSync(pathContacts));
		const contactToDelete = data.filter((item) => item.id === contactId);

		if (!contactToDelete) {
			console.log(`Contact with id ${contactId} not found.`);

			return false;
		}

		const newArrContacts = data.filter((item) => item.id !== contactId);
		console.log(newArrContacts);
		fs.writeFileSync(pathContacts, JSON.stringify(newArrContacts));

		return true;
	} catch (err) {
		console.log(err);
	}
};

const addContact = (body) => {
	try {
		const data = JSON.parse(fs.readFileSync(pathContacts));
		const { name, email, phone } = body;
		const newContact = {
			id: uuidv1(),
			name,
			email,
			phone,
		};
		data.push(newContact);

		fs.writeFileSync(pathContacts, JSON.stringify(data));

		return newContact;
	} catch (err) {
		console.log(err);
	}
};

const updateContact = (contactId, body) => {
	try {
		const { name, email, phone } = body;
		const data = JSON.parse(fs.readFileSync(pathContacts));
		const editContact = data.find((item) => item.id === contactId);
		editContact.name = name;
		editContact.email = email;
		editContact.phone = phone;

		fs.writeFileSync(pathContacts, JSON.stringify(data));

		return editContact;
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
