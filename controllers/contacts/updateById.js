const { Contact, schemas } = require("../../models/contacts");

const updateById = async (req, res) => {
	const { error } = schemas.addContact.validate(req.body);
	if (error) {
		res.status(400).json({ message: "missing fields" });
		return;
	}
	const { id } = req.params;
	const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
	if (!result) {
		res.status(404).json({ message: "Not found" });
		return;
	}
	res.json(result);
};

module.exports = updateById;
