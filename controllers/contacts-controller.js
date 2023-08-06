const { Contact } = require("../models/contact");

const HttpError = require("../helpers/HttpError");

const getAll = async (req, res, next) => {
	try {
		const result = await Contact.find();
		res.json(result);
	} catch (error) {
		next(error);
	}
};

const getContact = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await Contact.findById(contactId);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
};

const addNewContact = async (req, res, next) => {
	try {
		const result = await Contact.create(req.body);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

const deleteContact = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await Contact.findByIdAndDelete(contactId);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json({ message: "Contact deleted" });
	} catch (error) {
		next(error);
	}
};

const updateContactById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await Contact.findByIdAndUpdate(contactId, req.body, {
			new: true,
		});
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
};

const updateFavorite = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await Contact.findByIdAndUpdate(contactId, req.body, {
			new: true,
		});
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAll,
	getContact,
	addNewContact,
	deleteContact,
	updateContactById,
	updateFavorite,
};
