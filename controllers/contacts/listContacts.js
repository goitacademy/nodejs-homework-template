const { Contact } = require("../../models/contact");

const { ctrlWrapper } = require("../../helpers");

const listContacts = async (req, res) => {
	const result = await Contact.find({}, "-createdAt -updatedAt");
	res.status(200).json({
		code: 200,
		message: "success",
		data: result,
		qty: result.length,
	});
};

module.exports = ctrlWrapper(listContacts);
