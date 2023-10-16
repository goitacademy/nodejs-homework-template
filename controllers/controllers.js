const HttpError = require("../helpers/HttpError.js");
const ctrlWrapper = require('../decorators/ctrlWrapper.js');
const { Contact } = require("../models/Contact.js")

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner}, "-createdAt -updatedAt",{skip,limit}).populate("owner", "email");
    res.json(result);
}

const getById = async (req, res) => {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const result = await Contact.findOne({ _id: contactId, owner });
    if (!result) {
        throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(result);
}

const add = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
}

const updateById = async (req, res) => {
    const { _id: owner } = req.user;
    const { contactId } = req.params;

    const result = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body);
    if (!result) {
        throw HttpError(404, `Contact with ${contactId} not found`);
    }

    res.json(result);
}

const deleteById = async (req, res) => {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const result = await Contact.findOneAndRemove({ _id: contactId, owner });
    if (!result) {
        throw HttpError(404, `Contact with ${contactId} not found`);
    }

    res.json({
        message: "Delete success"
    })
}

const updateFavorite = async (req, res) => {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    if (!req.body) throw HttpError(400, "missing field favorite");
    const result = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body);
    if (!result) throw HttpError(404, "Not found");

    res.status(200).json(result);
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
    updateFavorite: ctrlWrapper(updateFavorite),
}