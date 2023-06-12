// const contactsService = require("../models/contacts");
const Movie = require("../models/contact");
const { HttpError } = require("../helpers/index");
const { ctrlWrapper } = require("../decorators/index");
const { contactAddSchema, contactUpdateFavoriteSchema } = require("../schemas/index");

const getAllContacts = async (req, res) => {
    const result = await Movie.find({}, "-createdAt -updatedAt");
    res.json(result);
};

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Movie.findOne({ _id: id }, "-createdAt -updatedAt");
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

const addContact = async (req, res) => {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing required name field");
    }
    const result = await Movie.create(req.body);
    res.status(201).json(result);
};

const updateContactById = async (req, res) => {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing fields");
    }
    const { id } = req.params;
    const result = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

const updateStatusContact = async (req, res) => {
    const { error } = contactUpdateFavoriteSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing field favorite");
    }
    const { id } = req.params;
    const result = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

const deleteContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Movie.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404);
    }

    res.json({ message: "Contact deleted" });
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContactById: ctrlWrapper(updateContactById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    deleteContactById: ctrlWrapper(deleteContactById),
};
