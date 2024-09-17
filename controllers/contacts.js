const {
	Contact,
	addSchema,
	updateFavoriteSchema,
	updateSchema,
} = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
	const result = await Contact.find();
	res.status(200).json(result);
};

const getContactById = async (req, res) => {
	const { error } = addSchema.validate(req.body);
	if (error) {
		throw HttpError(404, error.message);
	}
	const { contactId } = req.params;
	const result = await Contact.findOne({ _id: contactId });
	res.status(200).json(result);
};

const addContact = async (req, res) => {
	const { error } = addSchema.validate(req.body);
	if (error) {
		throw HttpError(400, "missing required name field");
	}
	const result = await Contact.create(req.body);
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
	const { error } = updateSchema.validate(req.body);
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
	const { error } = updateFavoriteSchema.validate(req.body);
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
