const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const dataValidation = require("../utils/validation");
const dbPath = "./models/contacts.json";
/**
 *@param {Object} req
 *@param {Object} res
 * @description get all contacts from database
 */
const listContacts = async (req, res) => {
	try {
		const data = await fs.readFile(dbPath, "utf-8");
		const contacts = JSON.parse(data);
		if (contacts.length > 0) {
			res.json(contacts);
		} else {
			res.status(404).json({
				message: "Not found contacts",
			});
		}
	} catch (error) {
		res.status(500).json({ contacts: [], message: error.message });
		return error.message;
	}
};

/**
 * @description get contact by id from database
 *@param {Object} req
 *@param {Object} res
 */
const getContactById = async (req, res) => {
	try {
		const data = await fs.readFile(dbPath, "utf-8");

		const contact = JSON.parse(data).filter(
			contact => contact.id === req.params.contactId
		);
		contact.length > 0
			? res.json(contact[0])
			: res.status(404).json({ message: "Not found" });
	} catch (error) {
		res.status(500).json({ contact: {}, message: error.message });
	}
};

/**
 * @description remove contact from database
 *@param {Object} req
 *@param {Object} res
 */
const removeContact = async (req, res) => {
	try {
		const data = await fs.readFile(dbPath, "utf-8");
		let removedContact;
		const contacts = JSON.parse(data).filter(contact => {
			if (contact.id !== req.params.contactId) {
				return true;
			} else {
				removedContact = contact;
				return false;
			}
		});
		if (!removedContact) {
			res.status(404).json({ message: "Not found" });
			return;
		}
		fs.writeFile(dbPath, JSON.stringify(contacts));
		res.status(204).json(removedContact);
	} catch (error) {
		res.status(500).json({ contacts: {}, message: error.message });
	}
};

/**
 * @description add new contact to database
 *@param {Object} req
 *@param {Object} res
 */
const addContact = async (req, res) => {
	try {
		const { error } = dataValidation(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}
		const data = await fs.readFile(dbPath, "utf-8");
		const contacts = JSON.parse(data);
		const newContact = { ...req.body, id: uuidv4() };
		contacts.push(newContact);
		fs.writeFile(dbPath, JSON.stringify(contacts));
		res.status(201).json(newContact);
	} catch (error) {
		res.status(500).json({ contacts: {}, message: error.message });
	}
};

/**
 * @description add new contact to database
 *@param {Object} req
 *@param {Object} res
 */
const updateContact = async (req, res) => {
	try {
		const { error } = dataValidation(req.body, false);
		if (error) {
			return res.status(400).json({ message: error.message });
		}
		let updatedContact;
		const data = await fs.readFile(dbPath, "utf-8");
		const contacts = JSON.parse(data).map(contact => {
			if (contact.id === req.params.contactId) {
				updatedContact = { ...contact, ...req.body };
				return updatedContact;
			}
			return contact;
		});
		if (!updatedContact) {
			res.status(404).json({ message: "Not found" });
			return;
		}
		fs.writeFile(dbPath, JSON.stringify(contacts));
		res.status(202).json(updatedContact);
	} catch (error) {
		res.status(500).json({ contacts: {}, message: error.message });
	}
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
