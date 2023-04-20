const { controllerWrp } = require("../helpers");
const { Contact } = require("../models/contactSchema");

const getAllContacts = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 20 } = req.query;
	const { favorite } = req.query;
	const skip = (page - 1) * limit;
	if (!favorite) {
		const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit });
		res.json(contacts);
	}
	if (favorite) {
		const boolValue = favorite === "true";
		const contacts = await Contact.find(
			{ owner, favorite: { $eq: boolValue } },
			"-createdAt -updatedAt",
			{
				skip,
				limit,
			},
		);
		res.json(contacts);
	}
};

const getById = async (req, res) => {
	const { contactId } = req.params;
	const contact = await Contact.findById(contactId);
	res.status(200).json(contact);
};

const addContact = async (req, res) => {
	const { _id: owner } = req.user;
	const contact = await Contact.create({ ...req.body, owner });
	res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
	const { contactId } = req.params;
	await Contact.findByIdAndRemove(contactId);
	res.status(200).json({ message: "contact deleted" });
};

const changeContact = async (req, res) => {
	const contact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
	res.status(200).json(contact);
};

const updateStatusContact = async (req, res) => {
	const contact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
	res.status(200).json(contact);
};
module.exports = {
	getAllContacts: controllerWrp(getAllContacts),
	getById: controllerWrp(getById),
	addContact: controllerWrp(addContact),
	deleteContact: controllerWrp(deleteContact),
	changeContact: controllerWrp(changeContact),
	updateStatusContact: controllerWrp(updateStatusContact),
};
