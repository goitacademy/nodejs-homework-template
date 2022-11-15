const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact } = require('../models/contacts');

const getContacts = async (_, res, next) => {
	try {
		const contacts = await listContacts();
		res.status(200).json(contacts);
	} catch (error) {
		next(error);
	};
};

const getContactById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await getById(id);

		if (!contact) {
			const err = new Error(`Not found contact with id: ${id}`);
			err.status = 404;
			throw err;
		};

		return res.status(200).json(contact);
	} catch (error) {
		next(error);
	};
};

const postContact = async (req, res, next) => {
	try {
		const { body } = req;

		await addContact(body);
		res.status(201).json(body);
	} catch (error) {
		next(error);
	};
};

const deleteContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await removeContact(id);

		if (!contact) {
			const err = new Error(`Not found contact with id: ${id}`);
			err.status = 404;
			throw err;
		};
    
		return res.status(200).json({ "message": `contact with id: ${id} was deleted` });
	} catch (error) {
		next(error);
	};
};

const putContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { body } = req;

		const contact = await updateContact(id, body);

		if (!contact) {
			const err = new Error(`Not found contact with id: ${id}`);
			err.status = 404;
			throw err;
		};

		return res.status(200).json(contact);
	} catch (error) {
		next(error);
	};
};

module.exports = {
	getContacts,
	getContactById,
	postContact,
	deleteContact,
	putContact,
};