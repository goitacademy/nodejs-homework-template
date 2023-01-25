const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const updateStatusContact = async (req, res) => {
	const id = req.params.contactId;

	if (req.body.favorite === undefined) {
		res.status(400).json({ message: "missing field favorite" });
	}

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

module.exports = updateStatusContact;
