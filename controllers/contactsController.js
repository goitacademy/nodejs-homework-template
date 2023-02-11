const { Contact, schemas } = require("../models/contacts");

const addContact = async (req, res) => {
	const { error } = schemas.addContact.validate(req.body);
	if (error) {
		res.status(400).json({ message: "missing required name field" });
		return;
	}
	const result = await Contact.create(req.body);
	res.status(201).json(result);
};

const getAll = async (req, res) => {
	const result = await Contact.find();
	res.json(result);
};

const getById = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findById(id);
	if (!result) {
		res.status(404).json({ message: "Not found" });
		return;
	}
	res.json(result);
};

const removeById = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findByIdAndRemove(id);
	if (!result) {
		res.status(404).json({ message: "Not found" });
		return;
	}
	res.json({
		message: "contact deleted",
	});
};

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

const updateStatusContact = async (req, res) => {
	const { error } = schemas.updateStatusContact.validate(req.body);
	if (error) {
		res.status(400).json({ message: "missing field favorite" });
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

module.exports = {
	getAll,
	getById,
	addContact,
	updateById,
	updateStatusContact,
	removeById,
};
