const contacts = require('../models/contacts');
const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res, next) => {
        const result = await contacts.listContacts();
        res.status(200).res.json(result)
};

const getById = async (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    const result = await contacts.getById(id);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(200).res.json(result);
};

const addContact = async (req, res, next) => {
        const result = await contacts.addContact(req.body);
        res.status(201).json(result)
};

const updateById = async (req, res, next) => {
        const { contactId } = req.params;
        const result = await contacts.updateContact(contactId, req.body);
        if (!result) {
            HttpError(404, 'Not Found')
        }
        res.status(200).res.json(result)
};

const deleteById = async (req, res, next) => {
        const { contactId } = req.params;
        const result = await contacts.removeContact(contactId);
        if (!result) {
            return HttpError(400, 'Not found')
        } 
    res.status(200).res.json({
        message: "contact deleted"
    });
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    updateById : ctrlWrapper(updateById),
    deleteById : ctrlWrapper(deleteById),
}