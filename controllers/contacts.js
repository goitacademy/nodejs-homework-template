const functions = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const Joi = require("joi");

const addSchema = Joi.object({
	name: Joi.string().min(3).required(),
	email: Joi.string().required(),
	phone: Joi.string().min(7).required(),
});

const listContacts = async (req, res) => {
	const result = await functions.listContacts();
	res.json(result);
};

const getById = async (req, res) => {
	const { id } = req.params;
	const result = await functions.getContactById(id);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

const addContact = async (req, res) => {
	const { error } = addSchema.validate(req.body);
	if (error) {
		throw HttpError(400, error.message);
	}
	const result = await functions.addContact(req.body);
	res.status(201).json(result);
};

const deleteContact = async (req, res) => {
	const { id } = req.params;
	const result = await functions.removeContact(id);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json({
		message: "Contact deleted succesfully",
	});
};

const updateContact = async (req, res) => {
	const { error } = addSchema.validate(req.body);
	if (error) {
		throw HttpError(400, error.message);
	}
	const { id } = req.params;
	const result = await functions.updateContact(id, req.body);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

module.exports = {
	listContacts: ctrlWrapper(listContacts),
	getById: ctrlWrapper(getById),
	addContact: ctrlWrapper(addContact),
	deleteContact: ctrlWrapper(deleteContact),
	updateContact: ctrlWrapper(updateContact),
};
