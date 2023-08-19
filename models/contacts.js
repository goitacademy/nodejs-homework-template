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
		const deletedContact = data.find((item) => item.id === contactId);
		return deletedContact;
	} catch (err) {
		console.log(err);
	}
};

const addContact = (name, email, phone) => {
	try {
		const data = JSON.parse(fs.readFileSync(pathContacts));
		const newContact = {
			id: uuidv1(),
			name,
			email,
			phone,
		};
		data.push(newContact);
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};

const updateContact = (contactId, name, email, phone) => {
	fs.readFile(pathContacts)
		.then((data) => JSON.parse(data))
		.then((data) => {
			const oneContact = data.find((item) => item.id === contactId);
			oneContact.name = name;
			oneContact.email = email;
			oneContact.phone = phone;
		})
		.catch((err) => console.log(err));
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
