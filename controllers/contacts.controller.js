const service = require('../services/contacts.service');
const {
	validateSchemaPost,
	validateSchemaPut,
	validateSchemaFavorite,
} = require('../utils/joi/joi');

const getAll = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;
		const favorite = req.query.favorite;

		const results = await service.getContactsQuery(page, limit, favorite);
		res.status(200).json({
			status: 'success',
			code: 200,
			ResponseQueryData: {
				contacts: results,
			},
		});
	} catch (err) {
		console.error('Error Description: ', err.message);
		next(err);
	}
};

const getById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await service.getById(contactId);
		if (result) {
			res.status(200).json({
				status: 'success',
				code: 200,
				data: {
					contact: result,
				},
			});
		} else {
			res.status(404).json({
				status: 'fail',
				code: 404,
				message: 'Not found',
			});
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
};

const createContact = async (req, res, next) => {
	try {
		const body = req.body;
		const validateContactSave = validateSchemaPost.validate(body);
		if (validateContactSave.error) {
			const errorField = validateContactSave.error.details.map(
				elem => elem.message
			);
			return res.status(400).json({
				status: 'fail',
				code: 400,
				message: errorField,
			});
		}
		const newContact = await service.createContact(body);
		res.status(201).json({
			status: 'created',
			code: 201,
			data: {
				newContact,
			},
		});
	} catch (err) {
		console.error(err);
		next(err);
	}
};

const updateContact = async (req, res, next) => {
	try {
		const { error } = validateSchemaPut.validate(req.body);
		if (error)
			return res.status(400).json({
				status: 'fail',
				code: 400,
				message: error.details[0].message,
			});
		const { name, email, phone } = req.body;
		const { contactId } = req.params;
		const body = req.body;
		if (!name && !email && !phone) {
			res.status(400).json({
				status: 'error',
				code: 400,
				message: 'missing fields',
			});
		}
		const updatedContact = await service.updateContact(contactId, body);
		if (updatedContact) {
			res.status(200).json({
				status: 'success',
				code: 200,
				data: {
					updatedContact,
				},
			});
		} else {
			res.status(404).json({
				status: 'fail',
				code: 404,
				message: 'Contact not found',
			});
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
};

const updateFavorite = async (req, res, next) => {
	try {
		const { error } = validateSchemaFavorite.validate(req.body);
		if (error)
			return res.status(400).json({
				status: 'error',
				code: 400,
				message: error.details[0].message,
			});
		const { contactId } = req.params;
		const { favorite } = req.body;
		const updatedFavorite = await service.updateFavorite(contactId, favorite);
		if (favorite === undefined || null) {
			return res.status(400).json({
				status: 'fail',
				code: 400,
				message: 'Missing field favorite',
			});
		}
		if (updatedFavorite) {
			res.status(200).json({
				status: 'success',
				code: 200,
				data: {
					updatedFavorite,
				},
			});
		} else {
			res.status(404).json({
				status: 'fail',
				code: 404,
				message: 'Not found',
			});
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
};

const removeContact = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const deletedContact = await service.removeContact(contactId);
		if (!deletedContact) {
			res.status(404).json({
				status: 'fail',
				code: 404,
				message: 'Contact not found',
			});
		} else {
			res.status(200).json({
				status: 'success',
				code: 200,
				message: 'Contact deleted',
			});
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
};

module.exports = {
	getAll,
	getById,
	createContact,
	updateContact,
	updateFavorite,
	removeContact,
};
