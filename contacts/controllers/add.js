const Contacts = require("../../models/contacts");

const addContact = async (req, res) => {
	const result = await Contacts.create(req.body);
	res.status(201).json({
		_id: result._id,
		name: result.name,
		email: result.email,
		phone: result.phone,
		favorite: result.favorite,
	});
	res.status(201).json(result);
};

module.exports = addContact;