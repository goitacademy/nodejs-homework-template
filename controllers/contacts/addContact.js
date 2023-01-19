const contactsOperation = require("../../models/contacts");

const addContact = async (req, res) => {
	const newContact = await contactsOperation.addContact(req.body);
	res.status(201).json({
		status: "success",
		code: 201,
		data: {
			result: newContact,
		},
	});
};

module.exports = addContact;
