const { Contact } = require("../../models/contact");

const { ctrlWrapper } = require("../../helpers");

const addContact = async (req, res) => {
	const result = await Contact.create(req.body);
	res.status(201).json({
		code: 201,
		message: "contact successfully added",
		data: result,
	});
};

module.exports = ctrlWrapper(addContact);
