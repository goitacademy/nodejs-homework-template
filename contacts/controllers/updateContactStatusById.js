const Contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const updateContactStatusById = async (req, res) => {
	const { id } = req.params;
	const result = await Contacts.findByIdAndUpdate(id, req.body, {
		new: true,
	}).select("-createdAt -updatedAt -owner");

	if (!result) {
		throw HttpError(404);
	}

	res.json(result);
};

module.exports = updateContactStatusById;