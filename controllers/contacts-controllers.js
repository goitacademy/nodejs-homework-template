const contactsService = require('../models/contacts');
const { HttpError } = require('../helpers');
const { ctrlWrapper } = require('../decorators');


const getAllContacts = async (req, res, next) => {
    const result = await contactsService.listContacts();
    res.json(result);   
};

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
        throw new HttpError(404);
    }
    res.json(result);
};

const addContact = async (req, res, next) => {
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
};

const deleteContact = async (req, res, next) => { 
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
        throw new HttpError(404);
    }
    res.json({
        message: "Contact deleted"
    })
};

const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
        throw new HttpError(404);
    }
    res.json(result);
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact),
};
 