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
		return contact?.[0] || {};
	} catch (error) {
		return error;
	}
};

/**
 * @description remove contact from database
 * @param {String} contactId
 * @returns {Promise<Object>} removedContact
 */
const removeContact = async contactId => {
	try {
		const data = await fs.readFile(dbPath, "utf-8");
		let removedContact = {};
		const contacts = JSON.parse(data).filter(contact => {
			if (contact.id !== contactId) {
				return true;
			} else {
				removedContact = contact;
				return false;
			}
		});
		fs.writeFile(dbPath, JSON.stringify(contacts));
		return removedContact;
	} catch (error) {
		return error;
	}
};

/**
 * @description add new contact to database
 * @param {Object} body
 * @returns {Promise<Object>} newContact
 */
const addContact = async body => {
	try {
		const data = await fs.readFile(dbPath, "utf-8");
		const contacts = JSON.parse(data);
		const newContact = { ...body, id: uuidv4() };
		contacts.push(newContact);
		fs.writeFile(dbPath, JSON.stringify(contacts));
		return newContact;
	} catch (error) {
		return error;
	}
};

/**
 * @description add new contact to database
 * @param {String} contactId
 * @param {Object} body
 * @returns {Promise<Object>} updated contact
 */
const updateContact = async (contactId, body) => {
	try {
		let updatedContact = {};
		const data = await fs.readFile(dbPath, "utf-8");
		const contacts = JSON.parse(data).map(contact => {
			if (contact.id === contactId) {
				updatedContact = { ...contact, ...body };
				return updatedContact;
			}
			return contact;
		});
		fs.writeFile(dbPath, JSON.stringify(contacts));
		return updatedContact;
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
