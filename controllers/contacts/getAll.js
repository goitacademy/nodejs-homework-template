const { token } = require("morgan");
const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
	try {
		const id = req.userId;
		const { page = 1, limit = 10 } = req.query;
		const skip = (page - 1) * limit;
		const contacts = await Contact.find(
			{ owner: id },
			"-createdAt -updatedAt",
			{
				skip,
				limit,
			}
		);
		res.json(contacts);
	} catch (error) {
		next(error);
	}
};

module.exports = getAll;
