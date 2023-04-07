const { addContact } = require("../models/contacts");
const { dataValidator } = require("../helpers/dataValidator");
const objectFieldsChecker = require("../helpers/objectFieldsChecker");
const postContact = async (req, res, next) => {
	if (dataValidator(req.body).error) {
		const alertMessage = objectFieldsChecker(req.body);
		res.status(400).json({ message: alertMessage });
		return;
	}
	const contact = await addContact(req.body);
	res.status(201).json(contact);
	next();
};

module.exports = postContact;
