const { getContactById } = require("../models/contacts");

const getById = async (req, res, next) => {
	const { contactId } = req.params;
	const contact = await getContactById(contactId);
	if (!contact) {
		res.status(404).json({ message: "Not found" });
		return;
	}
	res.status(200).json(contact);
	next();
};

module.exports = getById;
