const {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
} = require("../models/contacts");
const Joi = require("joi");

const { httpError, wrapper } = require("../helpers");

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
});

const getAll = async (req, res) => {
	const contacts = await listContacts();

	res.status(200).json(contacts);
};

const getById = async (req, res) => {
	const { contactId } = req.params;

	const foundContact = await getContactById(contactId);

	if (!foundContact) {
		throw httpError(404, "Not found");
	}
	res.status(200).json(foundContact);
};

const create = async (req, res) => {
	const { error } = addSchema.validate(req.body);

	if (error) {
		throw httpError(400, error.message);
	}
	res.status(201).json(await addContact(req.body));
};

const remove = async (req, res) => {
	const { contactId } = req.params;

	const response = await removeContact(contactId);

	if (!response) {
		throw httpError(404, "Not found");
	}

	res.status(200).json(response);
};

const update = async (req, res) => {
	const { contactId } = req.params;

	if (!Object.keys(req.body).length) {
		throw httpError(400, "Missing fields");
	}

	const response = await updateContact(contactId, req.body);

	if (!response) {
		throw httpError(404, "Not found");
	}

	res.status(200).json(response);
};

module.exports = {
	getAll: wrapper(getAll),
	getById: wrapper(getById),
	create: wrapper(create),
	remove: wrapper(remove),
	update: wrapper(update),
};
