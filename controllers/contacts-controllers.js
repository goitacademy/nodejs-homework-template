const { ctrlWrapper } = require("../utils");

const {Contact} = require("../models/contacts");

const { HttpError } = require("../helpers/HttpError");

const listContacts = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 20, favorite} = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit, favorite}).populate("owner", "name email");
    res.json(result);
}

const getContactById = async (req, res) => {
    const { id } = req.params;
    // const result = await Contact.findOne({_id: id});
    const result = await Contact.findById(id);
    if (!result) {
        throw HttpError(404, `Contact with ${id} not found`);
    }
    res.json(result);
};

const addContact = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
}

const updateContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, `Contact with ${id} not found`);
    }
    res.json(result);
}

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, `Contact with ${id} not found`);
    }
    res.json(result);
}

const removeContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404, `Contact with ${id} not found`);
    }

    res.json({
        message: "Delete success"
    })
}

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    removeContact: ctrlWrapper(removeContact),
}