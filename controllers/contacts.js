const { listContacts, getContactById, addContactToList, updateContactById, removeContactById } = require('../models/contacts.js');
const HttpError = require('../utils/http-error');
const controllerWrap = require("../utils/controller-wrap")

const getContactsList = async (req, res) => {
    res.json(await listContacts());
}

const getContact = async (req, res) => {
    const {contactId} = req.params;
    const result = await getContactById(contactId);
    if(!result) {
        throw HttpError({status: 404, message: "Not found"});
    }
    res.json(result);
}

const addContact = async (req, res) => {
    const result = await addContactToList(req.body);

    res.status(201).json(result);
}

const deleteContact = async (req, res) => {
    const {contactId} = req.params;
    const result = await removeContactById(contactId);
    if (!result) {
      throw HttpError({status: 404, message: "Not found"});
    }
    res.json({ message: 'contact deleted' });
}

const updateContact = async (req, res) => {
    const {contactId} = req.params;
    const result = await updateContactById(contactId, req.body);
    if (!result) {
      throw HttpError({status: 404, message: "Not found"});
    }
    res.json(result);
}

module.exports = {
    getContactsList: controllerWrap(getContactsList), 
    getContact: controllerWrap(getContact), 
    addContact: controllerWrap(addContact), 
    updateContact: controllerWrap(updateContact), 
    deleteContact: controllerWrap(deleteContact)};