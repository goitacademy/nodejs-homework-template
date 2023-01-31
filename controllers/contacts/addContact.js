const { Contact } = require("../../models");

const addContact = async (req, res) => {
	if (!req.body.name) {
		throw new Error("Name is required");
	}

	const { _id } = req.user;
	const newContact = await Contact.create({ ...req.body, owner: _id });
	if (!newContact) {
		throw new Error("Contact not added");
	}
	res.status(201).json({
		status: "success",
		code: 201,
		data: {
			result: newContact,
		},
	});
};

module.exports = addContact;
