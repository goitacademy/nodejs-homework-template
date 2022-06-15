const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
	try {
		const contacts = await fs.readFile(contactsPath, "utf-8");
		return JSON.parse(contacts);
	} catch (error) {
		console.log(`Error: ${error}`);
	}
};

const getContactById = async (id) => {
	try {
		const contacts = await listContacts();
		const result = contacts.find((item) => item.id === id);
		return result ? result : null;
	} catch (error) {
		console.log(`Error: ${error}`);
	}
};

const addContact = async ({ name, email, phone }) => {
	try {
		const contacts = await listContacts();
		const newContact = {
			id: v4(),
			name,
			email,
			phone,
		};
		contacts.push(newContact);
		await fs.writeFile(contactsPath, JSON.stringify(contacts));
		return newContact;
	} catch (error) {
		console.log(`Error: ${error}`);
	}
};

const updateContact = async (id, { name, email, phone }) => {
	try {
		const contacts = await listContacts();
		const contactIndex = contacts.findIndex((item) => item.id === id);
		if (contactIndex !== -1) {
			contacts[contactIndex].name = name;
			contacts[contactIndex].email = email;
			contacts[contactIndex].phone = phone;
			await fs.writeFile(contactsPath, JSON.stringify(contacts));
		}
	} catch (error) {
		console.log(`Error: ${error}`);
	}
};

const removeContact = async (id) => {
	try {
		const contacts = await listContacts();
		const index = contacts.findIndex((item) => item.id === id);

		const removeContact = contacts[index];
		if (index !== -1) {
			contacts.splice(index, 1);
			await fs.writeFile(contactsPath, JSON.stringify(contacts));
		}
		return removeContact ? removeContact : null;
	} catch (error) {
		console.log(`Error: ${error}`);
	}
};

module.exports = {
	listContacts,
	getContactById,
	addContact,
	updateContact,
	removeContact,
};
