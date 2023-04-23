const HttpError = require("../helpers/HttpError");

const { Contact } = require("../models/contact");

const ctrlWrapper = require("../utils/ctrlWrapper");

const getAllContacts = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
};

const getOneContact = async (req, res) => {
    const { contactId } = req.params;
    // const result = await Contact.findOne({ _id: contactId });
    const result = await Contact.findById(contactId);
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

const addNewContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
        throw HttpError(404);
    }
    res.json({ message: "contact deleted" });
};

const changeContact = async (req, res) => {
    const isBody = Object.keys(req.body);
    if (isBody.length === 0) {
        throw HttpError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

const changeFavorite = async (req, res) => {
    const isBody = Object.keys(req.body);
    if (isBody.length === 0) {
        throw HttpError(400, "missing field favorite");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    addNewContact: ctrlWrapper(addNewContact),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    changeContact: ctrlWrapper(changeContact),
    changeFavorite: ctrlWrapper(changeFavorite),
};
