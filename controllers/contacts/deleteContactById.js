const { Contact } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");

const deleteById = async (req, res, next) => {
	const { id } = req.params;
	const result = await Contact.findByIdAndRemove(id);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json({
		message: "Delete success",
	});
};

module.exports = ctrlWrapper(deleteById);
