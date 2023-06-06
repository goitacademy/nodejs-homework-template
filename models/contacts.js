// const fs = require('fs/promises')

const fs = require("fs").promises;

const contactsJson = "./models/contacts.json";

const listContacts = async () => {
	return fs.readFile(contactsJson).then((data) => JSON.parse(data));
};

const getContactById = async (contactId) => {
	return fs.readFile(contactsJson).then((data) => {
		const parsedData = JSON.parse(data);
		const user = parsedData.filter((users) => users.id === contactId);
		return user;
	});
};

const removeContact = async (contactId) => {
	return fs.readFile(contactsJson).then((data) => {
		const parsedData = JSON.parse(data);
		const user = parsedData.filter((users) => users.id === contactId);
		console.log(user);
	});
};

const addContact = async (body) => {
	console.log("this is my body", body);
};

const updateContact = async (contactId, body) => {};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
