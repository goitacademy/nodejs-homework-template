const contactsOperation = require("../../models/contacts");
const { NotFound } = require("http-errors");

const getContactById = async (req, res) => {
	const id = req.params.contactId;
	const contact = await contactsOperation.getContactById(id);

	if (!contact) {
		throw new NotFound(`Contact with id=${id} not found`);
	}

	res.json({
		status: "success",
		code: 200,
		data: {
			result: contact,
		},
	});
};

module.exports = getContactById;
