const { removeContact } = require("../models/contacts");

const deleteContact = async (req, res, next) => {
	const { contactId } = req.params;
	const contact = await removeContact(contactId);
	if (!contact) {
		res.status(404).json({ message: "Not found" });
		return;
	}
	res.status(200).json({ message: "contact deleted" });
	next();
};

module.exports = deleteContact;
