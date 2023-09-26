const {Contact} = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
    const allContacts = await Contact.find({}, "-createdAt -updatedAt");
    res.json(allContacts);
};

const getContactById = async (req, res) => {
    const { id } = req.params;
    const contactById = await Contact.findById(id);
    if (!contactById) {
        throw HttpError(404, "Not found");
    }
    res.json(contactById);
};

const removeContact = async (req, res) => {
    const { id } = req.params;
    const delContact = await Contact.findByIdAndRemove(id);
    if (!delContact) {
        throw HttpError(404, "Not found");
    }
    res.json({
        message: "Contact deleted"
    });
};

const addContact = async (req, res) => {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
    const { id } = req.params;
    const updContact = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!updContact) {
        throw HttpError(404, "Not found");
    }
    res.json(updContact);
};

const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const updFavorite = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!updFavorite) {
        throw HttpError(404, "Not found");
    }
    res.json(updFavorite);
};

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    removeContact: ctrlWrapper(removeContact),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite),
}