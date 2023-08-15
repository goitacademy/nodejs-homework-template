// const fs = require('fs/promises')
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "contacts.json");
let data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const listContacts = async () => {
	return data;
};

const getContactById = async (contactId) => {
	const foundContact = data.find((el) => el.id === contactId);
	console.log(foundContact);
	return foundContact;
};

const addContact = async (body) => {
	const uniqueId = () => {
		const dateString = Date.now().toString(36);
		const randomness = Math.random().toString(36).substr(2);
		return dateString + randomness;
	};

	body = {
		id: uniqueId(),
		...body,
	};

	data.push(body);

	fs.writeFile(filePath, JSON.stringify(data, null, 2), (error) => {
		if (error) {
			throw error;
		}
	});

	return body;
};

const removeContact = async (contactId) => {
	const newContacts = data.filter((el) => el.id !== contactId);
	data = [...newContacts];

	fs.writeFile(filePath, JSON.stringify(data, null, 2), (error) => {
		if (error) {
			throw error;
		}
	});

	return data;
};

const updateContact = async (contactId, body) => {};

module.exports = {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
};
