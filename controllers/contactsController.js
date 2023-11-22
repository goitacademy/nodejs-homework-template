import Contact from '../models/contact.js';

import HttpError from '../helpers/HttpError.js';

import ctrlWrapper from '../Wrapper/ctrlWrapper.js';

import {
	contactAddSchema,
	contactUpdateById,
	contactFavoriteSchema,
} from '../schemas/contact-schemas.js';

const getAllContacts = async (req, res) => {
	const result = await Contact.find();
	res.json(result);
};

const add = async (req, res) => {
	const { error } = contactAddSchema.validate(req.body);
	const result = await Contact.create(req.body);
	if (error) {
		throw new HttpError(406, error.message);
	}
	res.status(201).json(result);
};

const getById = async (req, res) => {
	const { contactId } = req.params;
	const { error } = contactUpdateById.validate(req.body);
	const result = await Contact.findById(contactId);
	if (error) {
		throw new HttpError(404, `Contact with id=${contactId} not found`);
	}
	res.json(result);
};

const updateById = async (req, res) => {
	const { contactId } = req.params;
	const { error } = contactUpdateById.validate(req.body);
	const result = await Contact.findByIdAndUpdate(contactId, req.body);
	if (error) {
		throw new HttpError(404, `Contact with id=${contactId} not found`);
	}
	res.json(result);
};

const updateByIdFavorite = async (req, res) => {
	const { contactId } = req.params;
	const { error } = contactFavoriteSchema.validate(req.body);
	const result = await Contact.findByIdAndUpdate(contactId, req.body);
	if (error) {
		throw new HttpError(404, `Contact with id=${contactId} not found`);
	}
	res.json(result);
};

const deleteById = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndDelete(contactId);
	if (!result) {
		throw new HttpError(404, `Contact with id=${contactId} not found`);
	}
	res.json({
		message: 'Delete success',
	});
};

export default {
	getAllContacts: ctrlWrapper(getAllContacts),
	getById: ctrlWrapper(getById),
	add: ctrlWrapper(add),
	updateById: ctrlWrapper(updateById),
	updateByIdFavorite: ctrlWrapper(updateByIdFavorite),
	deleteById: ctrlWrapper(deleteById),
};
