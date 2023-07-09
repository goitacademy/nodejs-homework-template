
const contacts = require('../models/contacts');
const {HttpError} = require('../utility');
const {ctrlWrapper} = require('../utility');



async function listContacts (req, res) {
    const result = await contacts.listContacts();
    res.json(result);
}

async function getContactById(req, res) {
    const {contactId} = req.params;
    const result = await contacts.getContactById(contactId);
    if(!result){
        throw HttpError(404, 'Not found');
    }
    res.json(result);
}

async function removeContact(req, res) {
    const {contactId} = req.params;
    const result = await contacts.removeContact(contactId);
    if(!result){
        throw HttpError(404, 'Not found');
    }
    res.json({message: 'contact deleted'});
}
  
async function addContact(req, res) {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}

async function updateContact(req, res) {
    const {contactId} = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if(!result){
        throw HttpError(404, 'Not found');
    }
    res.json(result);
}

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    removeContact: ctrlWrapper(removeContact),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact)
}