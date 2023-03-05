const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const dbPath = "./models/contacts.json";
/**
 * @description get all contacts from database
 * @returns {Promise<Array>} contacts
 */
const listContacts = async () => {
	try {
		const data = await fs.readFile(dbPath, "utf-8");
		const contacts = JSON.parse(data);
		console.log(data);
		return contacts;
	} catch (error) {
		return error.message;
	}
};

/**
 * @description get contact by id from database
 * @param {Number} contactId
 * @returns {Promise<Object>} contact
 */
const getContactById = async contactId => {
	try {
		const data = await fs.readFile(dbPath, "utf-8");

		const contact = JSON.parse(data).filter(
			contact => contact.id === contactId
		);
		return contact;
	} catch (error) {
		return error;
	}
};

/**
 * @description remove contact from database
 * @param {String} contactId
 * @returns {Promise<Array>} contacts
 */
const removeContact = async contactId => {
	try {
		const data = await fs.readFile(dbPath, "utf-8");
		const contacts = JSON.parse(data).filter(
			contact => contact.id !== contactId
		);
		fs.writeFile(dbPath, JSON.stringify(contacts));
		console.log(`Contact with id ${contactId} removed successfully!`);
		return contacts;
	} catch (error) {
		return error;
	}
};

/**
 * @description add new contact to database
 * @param {Object} body
 * @returns {Promise<Array>} contacts
 */
const addContact = async body => {
	try {
		const data = await fs.readFile(dbPath, "utf-8");
		const contacts = JSON.parse(data);
		const newContact = { ...body, id: uuidv4() };
		contacts.push(newContact);
		fs.writeFile(dbPath, JSON.stringify(contacts));
		console.log(
			`Contact ${JSON.stringify(newContact)} added successfully!`
		);
		return contacts;
	} catch (error) {
		return error;
	}
};

/**
 * @description add new contact to database
 * @param {String} contactId
 * @param {Object} body
 * @returns {Promise<Array>} contacts
 */
const updateContact = async (contactId, body) => {
	try {
		const data = await fs.readFile(dbPath, "utf-8");
		const contacts = JSON.parse(data);
		const newContacts = contacts.map(contact => {
			if (contact.id === contactId) {
				return { ...contact, ...body };
			}
			return contact;
		});
		fs.writeFile(dbPath, JSON.stringify(newContacts));
		return contacts;
	} catch (error) {
		return error;
	}
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
