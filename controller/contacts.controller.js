const Joi = require("joi");
const contactService = require("../services/contacts.service");

const contactSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	phone: Joi.string().required(),
});
const updateContactSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().email(),
	phone: Joi.string(),
});
const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

const get = async (req, res, next) => {
	try {
		const results = await contactService.getAll();
		res.json({
			status: "success",
			code: 200,
			results: results.length,
			data: {
				contacts: results,
			},
		});
	} catch (error) {
		console.error("Error reading file: ", error.message);
		next(error);
	}
};

const getById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await contactService.getById(contactId);
		if (contact) {
			res.json({
				status: "success",
				code: 200,
				data: {
					contact,
				},
			});
		} else {
			res.status(404).json({
				status: "fail",
				message: "Not found",
			});
		}
	} catch (error) {
		next(error);
	}
};

const create = async (req, res, next) => {
	try {
		const { body } = req;

		const validateNewContact = contactSchema.validate(body);

		if (validateNewContact.error) {
			return res.status(400).json({
				status: "fail",
				message: "Invalid data",
				error: validateNewContact.error,
			});
		}

		const newContact = await contactService.create(body);

		res.json({
			status: "success",
			code: 201,
			data: {
				newContact,
			},
		});
	} catch (error) {
		next(error);
	}
};

const update = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const { body } = req;

		const validateNewContact = updateContactSchema.validate(body);

		if (validateNewContact.error) {
			return res.status(400).json({
				status: "fail",
				message: "Invalid data",
				error: validateNewContact.error,
			});
		}
		const updateData = await contactService.update(contactId, body);

		res.json({
			status: "success",
			code: 200,
			data: {
				updateData,
			},
		});
	} catch (error) {
		if (error.message === "Contact not found") {
			res.status(404).json({
				status: "fail",
				message: "Not found",
			});
		} else {
			next(error);
		}
	}
};
const updateFavorite = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const { favorite } = req.body;

		const validateFavorite = updateFavoriteSchema.validate({ favorite });

		if (validateFavorite.error) {
			return res.status(400).json({
				status: "fail",
				message: "Invalid data",
				error: validateFavorite.error,
			});
		}

		const updateData = await contactService.updateFavorite(contactId, favorite);

		res.json({
			status: "success",
			code: 200,
			data: {
				updateData,
			},
		});
	} catch (error) {
		if (error.message === "Contact not found") {
			res.status(404).json({
				status: "fail",
				message: "Not found",
			});
		} else {
			next(error);
		}
	}
};

const remove = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await contactService.remove(contactId);
		if (contact) {
			res.json({
				status: "success",
				code: 200,
				message: "contact deleted",
				data: {
					contact,
				},
			});
		} else {
			res.status(404).json({
				status: "fail",
				message: "Not found",
			});
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	get,
	getById,
	create,
	update,
	updateFavorite,
	remove,
};
