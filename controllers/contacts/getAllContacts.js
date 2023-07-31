const { Contact } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");

const getAll = async (req, res, next) => {
	const result = await Contact.find();
	if (!result) {
		throw HttpError(404, "Request faild");
	}
	res.json(result);
};

module.exports = ctrlWrapper(getAll);
