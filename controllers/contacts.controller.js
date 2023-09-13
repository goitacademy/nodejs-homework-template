const Joi = require("joi");
const contactServices = require("../services/contacts.service");

const get = async (req, res, next) => {
	try {
		const { query, user } = req;
		const results = await contactServices.getAll({
			...query,
			owner: user._id,
		});
		return res.status(200).json({
			data: {
				contacts: results,
			},
		});
	} catch (err) {
		console.error(err);
		next(err);
	}
};

const getOne = async (req, res, next) => {
	try {
		const { user, params } = req;
		const { contactId } = params;
		const results = await contactServices.getOne(contactId, user._id);

		if (results) {
			return res.status(200).json({
				data: {
					contact: results,
				},
			});
		} else {
			return res.status(404).json({
				message: "Not found",
			});
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
};

const create = async (req, res, next) => {
	const { body, user } = req;
	const schema = Joi.object({
		name: Joi.string().min(3).max(35).required(),
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
			.required(),
		phone: Joi.string().required(),
	});
	try {
		const { error } = schema.validate(body);

		if (!error) {
			const results = await contactServices.create({
				...body,
				owner: user._id,
			});
			return res.status(201).json({
				data: {
					contact: results,
				},
			});
		} else {
			return res.status(400).json({
				message: "missing required field",
			});
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
};

const update = async (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(35),
		email: Joi.string().email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		}),
		phone: Joi.string(),
	}).or("name", "email", "phone");

	const { body, user, params } = req;
	const { error } = schema.validate(body);
	const { contactId } = params;

	try {
		const results = await contactServices.update(contactId, user._id, body);
		if (!error) {
			if (results) {
				return res.status(200).json({
					data: {
						contact: results,
					},
				});
			} else {
				return res.status(404).json({
					message: "Not found",
				});
			}
		} else {
			return res.status(400).json({
				message: "missing fields",
			});
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
};

const updateStatus = async (req, res, next) => {
	const schema = Joi.object({
		favorite: Joi.boolean().required(),
	});

	const { body, params, user } = req;
	const { error } = schema.validate(body);
	const { contactId } = params;
	const { favorite } = body;

	try {
		const results = await contactServices.updateStatus(
			contactId,
			user._id,
			favorite
		);
		if (!error) {
			if (results) {
				return res.status(200).json({
					data: {
						contact: results,
					},
				});
			} else {
				return res.status(404).json({
					message: "Not found",
				});
			}
		} else {
			return res.status(400).json({
				message: "missing field favorite",
			});
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
};

const remove = async (req, res, next) => {
	try {
		const { user, params } = req;
		const { contactId } = params;
		const results = await contactServices.remove(contactId, user._id);
		if (results) {
			return res.status(200).json({
				data: {
					contact: results,
				},
				message: "Contact removed from list",
			});
		} else {
			return res.status(404).json({
				message: "Not found",
			});
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
};

module.exports = {
	get,
	getOne,
	create,
	update,
	updateStatus,
	remove,
};
