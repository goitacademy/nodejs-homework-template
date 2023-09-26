const { HttpErrors, ctrlWrapper } = require('../helpers');
const Contact = require('../models/contact');

const getAll = async (req, res, next) => {
    const contacts = await Contact.find();
    res.json(contacts)
};

const getById = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
        throw HttpErrors(404, 'Not Found')
    }
    res.json(contact)
};

const add = async (req, res, next) => {
    const contact = await Contact.create(req.body)
    res.status(201).json(contact)
};

const updateById = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!contact) {
        throw HttpErrors(404, 'Not found')
    };
    res.json(contact);
};

const updateStatusById = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!contact) {
        throw HttpErrors(404, 'Not found')
    };
    res.json(contact);
};

const deleteById = async (req, res, next) => {
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