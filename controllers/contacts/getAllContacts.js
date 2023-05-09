const { Contact } = require("../../models");

const getAllContacts = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 10, favorite } = req.query;
	const skip = (page - 1) * limit;

	const filter = favorite ? { owner, favorite } : { owner };

	const result = await Contact.find(filter, "-createdAt -updatedAt", {
		skip,
		limit,
	}).populate("owner", "email subscription");
	res.status(200).json(result);
};

module.exports = getAllContacts;