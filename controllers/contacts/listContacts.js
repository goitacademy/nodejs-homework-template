const { Contact } = require("../../models/contact");

const { ctrlWrapper } = require("../../helpers");

const listContacts = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 20 } = req.query;

	const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
		skip: (page - 1) * limit,
		limit,
	}).populate("owner", "email");

	res.status(200).json({
		code: 200,
		message: "success",
		data: result,
		qty: result.length,
	});
};

module.exports = ctrlWrapper(listContacts);
