const { addContact } = require('../../models/contacts');

const add = async (req, res, next) => {
	const result = await addContact(req.body);
	res.status(201).json(result);
};

module.exports = add;
