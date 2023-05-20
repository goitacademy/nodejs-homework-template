const Contact = require("../../models/contact");

const deleteById = async (req, res, next) => {
	try {
		const { contactId } = req.params;

		const result = await Contact.findByIdAndRemove(contactId);

		if (!result) {
			res.json({
				status: "error",
				code: 404,
				message: "Not found",
			});
			return;
		}

		res.json({ message: "contact deleted" });
	} catch (error) {
		next(error);
	}
};

module.exports = deleteById;
