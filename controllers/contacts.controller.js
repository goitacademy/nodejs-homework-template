const Joi = require("joi");
const contactServices = require("../services/contacts.service");

const get = async (req, res, next) => {
	try {
		const results = await contactServices.getAll();
		res.status(200).json({
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
		const { contactId } = req.params;
		const results = await contactServices.getOne(contactId);

		if (results) {
			res.status(200).json({
				data: {
					contact: results,
				},
			});
		} else {
			res.status(404).json({
				message: "Not found",
			});
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
};

const create = async (req, res, next) => {
	const { body } = req;
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
			const results = await contactServices.create(body);
			res.status(201).json({
				data: {
					contact: results,
				},
			});
		} else {
			res.status(400).json({
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

	const { body } = req;
	const { error } = schema.validate(body);
	const { contactId } = req.params;

	try {
		const results = await contactServices.update(contactId, body);
		if (!error) {
			if (results) {
				res.status(200).json({
					data: {
						contact: results,
					},
				});
			} else {
				res.status(404).json({
					message: "Not found",
				});
			}
		} else {
			res.status(400).json({
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

	const { body } = req;
	const { error } = schema.validate(body);
	const { contactId } = req.params;
	const { favorite } = req.body;

	try {
		const results = await contactServices.updateStatus(contactId, favorite);
		if (!error) {
			if (results) {
				res.status(200).json({
					data: {
						contact: results,
					},
				});
			} else {
				res.status(404).json({
					message: "Not found",
				});
			}
		} else {
			res.status(400).json({
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
		const { contactId } = req.params;
		const results = await contactServices.remove(contactId);
		if (results) {
			res.status(200).json({
				data: {
					contact: results,
				},
				message: "Contact removed from list",
			});
		} else {
			res.status(404).json({
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
