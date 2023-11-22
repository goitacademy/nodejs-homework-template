import Contact from '../models/contact.js';

import HttpError from '../helpers/HttpError.js';

import ctrlWrapper from '../Wrapper/ctrlWrapper.js';

import {
	contactAddSchema,
	contactUpdateById,
} from '../schemas/contact-schemas.js';

const getAllContacts = async (req, res) => {
	const result = await Contact.find();
	res.json(result);
};

const add = async (req, res) => {
	const { error } = contactAddSchema.validate(req.body);
	if (error) {
		throw new HttpError(406, error.message);
	}
	const result = await Contact.create(req.body);
	res.status(201).json(result);
};

const getById = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findById(contactId);
	if (!result) {
		throw new HttpError(404, `Contact with id=${contactId} not found`);
	}
	res.json(result);
};

const updateById = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndUpdate(contactId, req.body);
	if (!result) {
		throw new HttpError(404, `Contact with id=${contactId} not found`);
	}
	res.json(result);
};

// const updateById = async (req, res) => {
// 	const { error } = await contactUpdateById.validate(req.body);
// 	if (error) {
// 		throw new HttpError(400, error.message);
// 	}
// 	res.json(result);
// };

// const updateByIdName = async (req, res) => {
// 	const { contactId } = req.params;
// 	const result = await Contact.findByIdAndUpdate(contactId, req.body);
// 	if (!result) {
// 		throw new HttpError(404, `Contact with id=${contactId} not found`);
// 	}
// 	res.json(result);
// };

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
	// updateByIdName: ctrlWrapper(updateByIdName),
	deleteById: ctrlWrapper(deleteById),
};

// const getAllContacts = async (req, res, next) => {
// 	try {
// 		const result = await Contact.find();
// 		res.json(result);
// 	} catch (error) {
// 		next(error);
// 	}
// };

// const updateById = async (req, res, next) => {
// 	try {
// 		const { error } = contactUpdateById.validate(req.body);
// 		if (error) {
// 			throw HttpError(400, error.message);
// 		}
// 		const { contactId } = req.params;
// 		const result = await Contact.findByIdAndUpdate(contactId, req.body, {
// 			new: true,
// 			runValidators: true,
// 		});
// 		if (!result) {
// 			throw HttpError(404, `Contact with id=${contactId} not found`);
// 		}
// 		res.json(result);
// 	} catch (error) {
// 		next(error);
// 	}
// };

// const getById = async (req, res, next) => {
// 	try {
// 		const { contactId } = req.params;
// 		const result = await Contact.findById(contactId);
// 		if (!result) {
// 			throw HttpError(404, `Contact with id=${contactId} not found`);
// 		}
// 		res.json(result);
// 	} catch (error) {
// 		next(error);
// 	}
// };

// const add = async (req, res, next) => {
// 	try {
// 		const { error } = contactAddSchema.validate(req.body);
// 		if (error) {
// 			throw HttpError(406, error.message);
// 		}
// 		const result = await Contact.create(req.body);
// 		res.status(201).json(result);
// 	} catch (error) {
// 		next(error);
// 	}
// };

// const deleteById = async (req, res, next) => {
// 	try {
// 		const { contactId } = req.params;
// 		const result = await Contact.findByIdAndDelete(contactId);
// 		if (!result) {
// 			throw HttpError(404, `Contact with id=${contactId} not found`);
// 		}
// 		res.json({
// 			message: 'Delete success',
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };
