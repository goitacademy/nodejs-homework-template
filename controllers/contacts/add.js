const contactsApi = require("../../models/contacts");

const { addSchema } = require("../../schemas");

const add = async (req, res, next) => {
	console.log("add working..");
	try {
		const { error } = addSchema.validate(req.body);
		if (error) throw new Error(error);
		const contact = await contactsApi.addContact(req.body);
		res.status(201).json(contact);
	} catch (error) {
		next(error);
	}
};

module.exports = add;
