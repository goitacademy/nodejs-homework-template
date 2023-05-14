const contacts = require('../models/contacts.js');

const { HttpError, ctrlWrapper } = require('../helpers');

const listContacts = async (req, res, next) => {
    const result = await contacts.listContacts();
    res.json(result);
};

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
        throw HttpError(404, 'Not Found');
        // const error = new Error('Not found');
        // error.status = 404;
        // throw error;
        // return res.status(404).json({ message: 'Not found' });
    }
    res.json(result);
};

const addContact = async (req, res, next) => {
    // const { error } = addSchema.validate(req.body);
    // if (error) {
    //     const field = error.details[0].path[0];
    //     // throw HttpError(400, error.message);
    //     throw HttpError(400, `missing required '${field}'`);
    // }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
    // const { error } = addSchema.validate(req.body);
    // if (error) {
    //     // throw HttpError(400, error.message);
    //     throw HttpError(400, 'missing fields');
    // }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json(result);
};

const removeContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    // res.status(204).send();
    res.json({
        message: 'contact deleted',
    });
};

module.exports = {
    getAll: ctrlWrapper(listContacts),
    getById: ctrlWrapper(getContactById),
    add: ctrlWrapper(addContact),
    updateById: ctrlWrapper(updateContact),
    deleteById: ctrlWrapper(removeContact),
};
