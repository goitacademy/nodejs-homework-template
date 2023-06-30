const { Contact } = require("../models/contact");

const { schemas } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 20 } = req.query;
	// пагінація контактів
	const skip = (page - 1) * limit;
	const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
		skip,
		limit,
	}).populate("owner", "name, email");
	res.status(200).json(result);
};

const getContactById = async (req, res) => {
	const { error } = schemas.addSchema.validate(req.body);
	if (error) {
		throw HttpError(404, error.message);
	}
	const { id } = req.params;
	const result = await Contact.findById({ id });
	// const result = await Contact.findOne({ _id: contactId });
	res.status(200).json(result);
};

const addContact = async (req, res) => {
	const { _id: owner } = req.user;
	const { error } = schemas.addSchema.validate(req.body);
	if (error) {
		throw HttpError(400, "missing required name field");
	}
	const result = await Contact.create({ ...req.body, owner });
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
	const { contactId } = req.params;
	const result = await Contact.removeContact(contactId);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
	const { error } = schemas.updateSchema.validate(req.body);
	if (error) {
		throw HttpError(404, "missing fields");
	}
	const { contactId } = req.params;
	const result = await Contact.findIdAndUpdate(contactId, req.body);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
	const { error } = schemas.updateFavoriteSchema.validate(req.body);
	if (error) {
		throw HttpError(404, "missing fields");
	}
	const { contactId } = req.params;
	const result = await Contact.findIdAndUpdate(contactId, req.body, {
		new: true,
	});
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json(result);
};

module.exports = {
	listContacts: ctrlWrapper(listContacts),
	getContactById: ctrlWrapper(getContactById),
	addContact: ctrlWrapper(addContact),
	removeContact: ctrlWrapper(removeContact),
	updateContact: ctrlWrapper(updateContact),
	updateFavorite: ctrlWrapper(updateFavorite),
};
