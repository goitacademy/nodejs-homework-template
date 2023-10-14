const Contact = require('../models/contacts')
const { HttpError } = require("../helpers")

const {ctrlWrapper} = require("../helpers")


const getAll = async (req, res) => {
    const { _id: owner } = req.user
    console.log(req.query)
    const { page = 1, limit = 1 } = req.query;
    const skip = (page - 1) * limit;
    const filter = { owner };
    if (req.query.favorite === "true" || req.query.favorite === "false") {
      filter.favorite = req.query.favorite === "true";
    }
        const contactList = await Contact.find(filter, "-createdAt -updateAt", {skip, limit}).populate("owner", "name email");
        res.json(contactList);
};

const getByID = async (req, res, next) => {
        const { contactId } = req.params;
        const contact = await Contact.findById(contactId)
        if (!contact) {
            throw HttpError(404, 'Not Found');
        }
        res.json(contact);
};

const postContact = async (req, res, next) => {
    const { _id: owner } = req.user;
        const newContact = await Contact.create({...req.body, owner});
        res.status(201).json(newContact);
};

const deleteContact = async (req, res, next) => {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndDelete(contactId);

        if (!result) {
            throw HttpError(404, "Not found")
        }
        res.json({ message: 'Contact deleted' });
};

const putContact = async (req, res) => {
        const { contactId } = req.params;
        const { body } = req;
        const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {new:true});
        if (updatedContact) {
            res.json(updatedContact);
        } else {
            res.status(404).json({ message: 'Not found' });
        }
};

const updateFavorite = async (req, res) => {
        const { contactId } = req.params;
        const { body } = req;
        const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {new:true});
        if (updatedContact) {
            res.json(updatedContact);
        } else {
            res.status(404).json({ message: 'Not found' });
        }
};



module.exports = {
    getAll: ctrlWrapper(getAll),
    getByID: ctrlWrapper(getByID),
    postContact: ctrlWrapper(postContact),
    deleteContact: ctrlWrapper(deleteContact),
    putContact: ctrlWrapper(putContact),
    updateFavorite: ctrlWrapper(updateFavorite),
}