const Contact = require("../models/contact");

const HttpError = require("../helpers/HttpError");

const ctrlWrapper = require('../helpers/ctrlWrapper');

const { addSchema, favouriteSchema } = require("../schemas/contacts");

const getAll = async (req, res) => {
	const contacts = await Contact.find();
	res.json(contacts);
}

const getById = async (req, res) => {
	const { id } = req.params;
	const contact = await Contact.findById(id);
	if (!contact) {
		throw HttpError(404);
	}
	res.json(contact)
}

const addContact = async (req, res) => {
    const {error} = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
	const addedContact = await Contact.create(req.body);
	res.status(201).json(addedContact);
}

const deleteById = async (req, res) => {
	const { id } = req.params;
	const deletedContact = await Contact.findByIdAndDelete(id)
	if (!deletedContact) {
		throw HttpError(404);
	}
	res.json({ message: 'contact deleted' });
}

const updateById = async (req, res) => {
    const {error} = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
	const { id } = req.params;
	const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {new: true})
	if (!updatedContact) {
		throw HttpError(404);
	}
	res.json(updatedContact)
}

const updateStatusContact  = async (req, res) => {
    const {error} = favouriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
	const { id } = req.params;
	const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {new: true})
	if (!updatedContact) {
		throw HttpError(404);
	}
	res.json(updatedContact);
}

module.exports = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	addContact: ctrlWrapper(addContact),
	deleteById: ctrlWrapper(deleteById),
	updateById: ctrlWrapper(updateById),
	updateStatusContact : ctrlWrapper(updateStatusContact),
}