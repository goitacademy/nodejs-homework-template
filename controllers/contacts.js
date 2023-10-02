const {Contact} = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const allContacts = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name email");;
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
    const { _id: owner } = req.user;
    const newContact = await Contact.create({ ...req.body, owner });
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