const contactsOperation = require("../../models/contacts");
const { NotFound } = require("http-errors");

const updateContact = async (req, res) => {
	const id = req.params.contactId;

	const updateContact = await contactsOperation.updateContact(id, req.body);
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
