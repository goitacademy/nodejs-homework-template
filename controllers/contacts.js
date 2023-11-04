const { Contact, addScheme} = require('../models/contact');
const HttpErr = require('../helpers/HttpErr');
const { ctrlWrapper } = require('../midlleware');

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 3 } = req.query;
    const skip = (page - 1) * limit;

    const response = await Contact.find({ owner })
        .skip(skip)
        .limit(limit)
        .populate('owner', 'email');

    res.json(response);
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const response = await Contact.findById(contactId);

    if (!response) {
        throw HttpErr(404, 'Not Found');
    }

    res.json(response);
};

const addContact = async (req, res) => {
    const { _id: owner } = req.user;
    const { error } = addScheme.validate(req.body);

    if (error) {
        throw HttpErr(400, error.message);
    }

    const response = await Contact.create({ ...req.body, owner });
    res.status(201).json(response);
};

const removeContact = async (req, res) => {
    const { id } = req.params;
    const response = await Contact.findByIdAndRemove(id);

    if (!response) {
        throw HttpErr(404, 'Not Found');
    }

    res.json({ message: 'Done' });
};

const updateContact = async (req, res) => {
    const { error } = addScheme.validate(req.body);

    if (error) {
        throw HttpErr(400, error.message);
    }

    const { id } = req.params;
    const response = await Contact.findOneAndUpdate({ _id: id }, req.body, { new: true });

    if (!response) {
        throw HttpErr(404, 'Not Found');
    }

    res.json(response);
};

const updateContactFavorite = async (req, res) => {
    const { error } = addScheme.validate(req.body);

    if (error) {
        throw HttpErr(400, error.message);
    }

    const { id } = req.params;
    const response = await Contact.findOneAndUpdate({ _id: id }, req.body, { new: true });

    if (!response) {
        throw HttpErr(404, 'Not Found');
    }

    res.json(response);
};

const getFavoriteContacts = async (req, res) => {
    const { favorite } = req.query;

    const { _id: owner } = req.user;
    
    let contacts;
    if (favorite === 'true') {
        contacts = await Contact.find({ owner, favorite: true });
    } else {
        contacts = await Contact.find({ owner });
    }

    res.json(contacts);
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
    updateContactFavorite: ctrlWrapper(updateContactFavorite),
    getFavoriteContacts: ctrlWrapper(getFavoriteContacts)
};
