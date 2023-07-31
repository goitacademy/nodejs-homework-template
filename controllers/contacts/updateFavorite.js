const { Contact } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");

const updateFavorite = async (req, res, next) => {
	const { id } = req.params;
	const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

module.exports = ctrlWrapper(updateFavorite);
