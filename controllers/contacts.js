const {Contact} = require("../models/contacts")

const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
    const result =await Contact.find({}, "-createdAt -updatedAt");
    res.json(result);
}

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const addContact = async (req, res) => {
    const result = await  Contact.create(req.body);
    res.status(201).json(result);
}

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json({
        message: "Delete success"
    })
}

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;

    if (Object.keys(req.body).length === 0){
        throw HttpError(400, "Missing field favorite");
    }

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});

    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
}

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    removeContact: ctrlWrapper(removeContact),
    updateStatusContact : ctrlWrapper(updateStatusContact ),
}