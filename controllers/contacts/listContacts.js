const { Contact } = require("../../models/contact");

const { ctrlWrapper } = require("../../helpers");

const listContacts = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 20, favorite = true || false } = req.query;

	const result = await Contact.find(
		{ owner, favorite },
		"-createdAt -updatedAt",
		{
			skip: (page - 1) * limit,
			limit,
		}
	).populate("owner", "email");

	res.status(200).json({
		code: 200,
		message: "success",
		data: result,
		qty: result.length,
		page,
		total_pages: result.length % limit,
	});
};

module.exports = ctrlWrapper(listContacts);
