const fs = require("fs").promises;
const path = require("path");
const contacts = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
	try {
		const getContacts = await fs.readFile(contacts, "utf8");
		const parseArray = await JSON.parse(getContacts);
		return parseArray;
	} catch (error) {
		console.log(error);
	}
};

const getContactById = async contactId => {
	try {
		const getContacts = await fs.readFile(contacts, "utf8");
		const findContactById = await JSON.parse(getContacts).find(
			contact => contact.id === contactId
		);
		return findContactById;
	} catch (error) {
		console.log(error);
	}
};

const removeContact = async contactId => {
	try {
		const getContacts = await fs.readFile(contacts, "utf8");
		const removeContact = await JSON.parse(getContacts).filter(
			contact => contact.id !== contactId
		);
		const writeNewArray = await fs.writeFile(
			contacts,
			JSON.stringify(removeContact),
			"utf8"
		);
		return writeNewArray;
	} catch (error) {
		console.log(error);
	}
};

const addContact = async body => {
	try {
		const getContacts = await fs.readFile(contacts, "utf8");
		const parseContacts = await JSON.parse(getContacts);
		const addNewContact = await [...parseContacts, body];
		const writeNewArray = await fs.writeFile(
			contacts,
			JSON.stringify(addNewContact),
			"utf8"
		);
		return writeNewArray;
	} catch (error) {
		console.log(error);
	}
};

const updateContact = async (contactId, body) => {
	try {
		const getContacts = await fs.readFile(contacts, "utf8");
		const parseContacts = await JSON.parse(getContacts);
		const updatedContacts = await parseContacts.map(contact => {
			if (contact.id === contactId) {
				return {
					...contact,
					...body,
				};
			}
			return contact;
		});
		await fs.writeFile(contacts, JSON.stringify(updatedContacts));
		return updatedContacts;
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
