const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const updateContact = async (req, res) => {
	const id = req.params.contactId;

	const updateContact = await Contact.findByIdAndUpdate(id, req.body, {
		new: true,
	});
	if (!updateContact) {
		throw new NotFound(`Contact with id=${id} not found`);
	}

	res.json({
		status: "success",
		code: 200,
		data: {
			result: updateContact,
		},
	});
};

module.exports = updateContact;
