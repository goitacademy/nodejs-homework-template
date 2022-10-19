const { Contact, addSchema } = require("../../models/contact");

const add = async (req, res, next) => {
	try {
		const { error } = addSchema.validate(req.body);
		if (error) throw new Error(error);
		const contact = await Contact.create({ ...req.body, owner: req.userId });
		res.status(201).json(contact);
	} catch (error) {
		next(error);
	}
};

module.exports = add;
