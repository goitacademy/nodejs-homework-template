const Contacts = require("../../models/contacts");

const addContact = async (req, res) => {
	const { _id: owner } = req.user;
	const newContact = await Contacts.create({ ...req.body, owner });
	res.status(201).json({
		newContact
	});
	res.status(201).json(newContact);
};

module.exports = addContact;