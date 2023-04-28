const { HttpError, ctrlWrapper } = require("../helpers");

const { Contact } = require("../models/contact");

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find(favorite ? { owner, favorite } : { owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email subscription");
    res.json(result);
};

const getById = async (req, res) => {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const result = await Contact.findOne({ _id: contactId, owner });
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

const add = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
};

const deleteById = async (req, res) => {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const result = await Contact.findOneAndDelete({ _id: contactId, owner }, { new: true });
    if (!result) {
        throw HttpError(404);
    }
    res.json({ message: "Delete success!" });
};

const updateById = async (req, res) => {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const result = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body, { new: true });
    if (!result) {
        throw HttpError(404);
    };
    res.json(result);
};

const updateFavorite = async (req, res) => {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const result = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body, { new: true });
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById),
    updateFavorite: ctrlWrapper(updateFavorite),
};