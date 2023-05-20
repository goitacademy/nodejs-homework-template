const { joiContactSchema } = require("../../validation/contacts");

const Contact = require("../../models/contact");

const editById = async (req, res, next) => {
	try {
		const { error } = joiContactSchema.validate(req.body);
		if (error) {
			res.json({
				status: "error",
				code: 400,
				message: "Bad request",
			});
			return;
		}

		const { contactId } = req.params;
		const result = await Contact.findByIdAndUpdate(contactId, req.body, {
			new: true,
		});

		if (!result) {
			res.json({
				status: "error",
				code: 404,
				message: "Not found",
			});
			return;
		}

		res.json({
			status: "success",
			code: 200,
			data: {
				result,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = editById;
