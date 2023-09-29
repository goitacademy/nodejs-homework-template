const { HttpErrors } = require('../helpers');
const { ctrlWrapper } = require('../decorators');
const Contact = require('../models/contact');

const getAll = async (req, res) => {
    const { _id: owner } = req.user
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    if (favorite) {
        const favoriteCurrent = favorite === 'true'
        const contacts = await Contact.find({ owner, favorite: favoriteCurrent }, '-createdAt -updatedAt -owner', { skip, limit });
        res.json(contacts);
        return
    }
    
    const contacts = await Contact.find({ owner }, '-createdAt -updatedAt -owner', { skip, limit });
    res.json(contacts);
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
        throw HttpErrors(404, 'Not Found')
    }
    res.json(contact)
};

const add = async (req, res) => {
    const { _id: owner } = req.user;
    const contact = await Contact.create({ ...req.body, owner });
    res.status(201).json({
        _id: contact._id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        favorite: contact.favorite 
    });
};

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!contact) {
        throw HttpErrors(404, 'Not found')
    };
    res.status(201).json({
        _id: contact._id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        favorite: contact.favorite
    });
};

const updateStatusById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!contact) {
        throw HttpErrors(404, 'Not found')
    };
    res.status(201).json({
        _id: contact._id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        favorite: contact.favorite
    });
};

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndRemove(contactId);
    if (!contact) {
        throw HttpErrors(404, 'Not Found')
    }
    res.json({ message: "contact deleted" });
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    updateStatusById: ctrlWrapper(updateStatusById),
    deleteById: ctrlWrapper(deleteById),
};