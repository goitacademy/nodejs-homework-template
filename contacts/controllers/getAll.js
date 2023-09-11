const Contacts = require("../../models/contacts");

const getAllContacts = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 20, favorite } = req.query;
	const skip = (page - 1) * limit;
	const query =
		typeof favorite === "undefined" ? { owner } : { favorite, owner };

	const result = await Contacts.find(query, "-createdAt -updatedAt -owner", {
		skip,
		limit,
	});

	res.json(result);
};

module.exports = getAllContacts;