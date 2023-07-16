const { RequestError, ctrlWrapper } = require("../helpers");

const { Contacts } = require("../models/contacts");

const getAll = async (req, res, next) => {
    const result = await Contacts.find();
    res.json(result);
};

const getById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contacts.findById(contactId);
    if (!result) {
        throw new RequestError(404, "Not found");
    }
    res.json(result);
};

const add = async (req, res, next) => {
    const result = await Contacts.create(req.body);
    res.status(201).json(result);
};

const update = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });
    if (!result) {
        throw new RequestError(404, "Not found");
    }
    res.json(result);
};
const updateFavorite = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });
    if (!result) {
        throw new RequestError(404, "Not found");
    }
    res.json(result);
};

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contacts.findByIdAndDelete(contactId);
    if (!result) {
        throw new RequestError(404, "Not found");
    }

    res.json({
        message: "Delete success",
    });
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    update: ctrlWrapper(update),
    updateFavorite: ctrlWrapper(updateFavorite),
    deleteById: ctrlWrapper(deleteById),
};