const { Contact } = require('../models/contacts');

const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (page - 1) * limit;

    const query = { owner };
    if (favorite !== undefined) {
        query.favorite = favorite;
    }

    const result = await Contact.find(query, '-createdAt -updatedAt', { skip, limit });
    res.json(result);
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json(result);
};

const addContact = async (req, res) => {
    const { _id: owner } = req.user;
    console.log(owner);
    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json(result);
};

const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json({ message: 'contact deleted' });
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json(result);
};

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json(result);
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
};
