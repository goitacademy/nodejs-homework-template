const { HttpError, ctrlrWrapper } = require('../helpers');
const { Contact } = require('../models/contact');

const getAll = async (_, res) => {
    const contactsList = await Contact.find();
    if (!Object.keys(contactsList)) throw HttpError(404, 'Not found');
    res.json(contactsList);
}

const getById = async (req, res) => {
    const contact = await Contact.findById(req.params.contactId);
    if (!contact) throw HttpError(404, 'Not found');
    res.json(contact);
    return contact;
}

const add = async (req, res) => {
    const contact = await Contact.create(req.body);
    if (!contact) throw HttpError(404, 'Not found');
    res.status(201).json(contact);
}

const deleteById = async (req, res) => {
    const result = await Contact.findByIdAndRemove(req.params.contactId);
    if (!result) throw HttpError(404, 'Not found');
    res.status(200).json({ message: `contact deleted` });
}

const updateById = async (req, res) => {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
    if (!updatedContact) throw HttpError(404, 'Not found');
    res.status(200).json(updatedContact);
}

const updateFavorite = async (req, res) => {
    const updatedFavorite = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
    if (!updateFavorite) throw HttpError(404, 'Not found');
    res.status(200).json(updatedFavorite);
}

module.exports = {
    getAll: ctrlrWrapper(getAll),
    getById: ctrlrWrapper(getById),
    add: ctrlrWrapper(add),
    deleteById: ctrlrWrapper(deleteById),
    updateById: ctrlrWrapper(updateById),
    updateFavorite: ctrlrWrapper(updateFavorite)
};