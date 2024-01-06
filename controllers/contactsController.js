const contacts = require("../models/contacts");

const { HttpError } = require("../helpers");

const getAllContacts = async (req, res) => {
	try {
		const result = await contacts.listContacts();
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

const getById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await contacts.getContactById(id);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
};

const addNewContact = async (req, res, next) => {
	try {
		const result = await contacts.addContact(req.body);

		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

const deleteContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await contacts.removeContact(id);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json({
			message: "contact deleted",
		});
	} catch (error) {
		next(error);
	}
};

const updateContactById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await contacts.updateContact(id, req.body);

		if (!contact) {
			throw HttpError(404, `Not found`);
		}

		res.status(200).json(contact);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllContacts,
	getById,
	addNewContact,
	deleteContact,
	updateContactById,
};
