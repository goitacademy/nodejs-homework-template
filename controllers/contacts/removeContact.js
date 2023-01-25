const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const removeContact = async (req, res) => {
	const id = req.params.contactId;
	const removeContact = await Contact.findByIdAndRemove(id);

	if (!removeContact) {
		throw new NotFound(`Contact with id=${id} not found`);
	}

	res.json({
		status: "success",
		message: "contact deleted",
		code: 200,
		data: {
			result: removeContact,
		},
	});
};

module.exports = removeContact;
