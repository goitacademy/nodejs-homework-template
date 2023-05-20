const { joiContactSchema } = require("../../validation/contacts");

const Contact = require("../../models/contact");

const createNew = async (req, res, next) => {
	try {
		const { error } = joiContactSchema.validate(req.body);
		if (error) {
			console.log(error);
			res.json({
				status: "error",
				code: 400,
				message: "Bad request",
			});
			return;
		}

		const result = await Contact.create(req.body);

		res.status(201).json({
			status: "success",
			code: 201,
			data: {
				result,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = createNew;
