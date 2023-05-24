const { Contact } = require('../models/contact.js')

const HttpError = require("../helpers/HttpError.js")

const ctrlWrapper = require('../helpers/ctrlWrapper.js')

const getAll = async (req, res) => {
    const result = await contacts.listContacts();
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "name email");
    const result = await Contact.find();
    res.status(200).json(result);
}

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId)
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.json(result);
}

const addContact = async (req, res) => {
    const newId = uuidv4();
    const { name, email, phone } = req.body;
    const newContact = {
        id: newId,
        name: name,
        email: email,
        phone: phone
    }
    const result = await contacts.addContact(newContact);
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    const result = await Contact.create(req.body);
    res.status(201).json(result);
}

const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.status(201).json({
        message: "contact deleted"
    })
}

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.status(200).json(result);
}

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.status(200).json(result);
}


module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact)
}