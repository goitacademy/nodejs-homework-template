const {
    listContactsService,
    getContactByIdService, 
    addContactService, 
    removeContactService, 
    updateContactService, 
    updateStatusContactService} = require('../services/contactService');
const {HttpError} = require("../helpers");
const ctrlWrapper = require("../decorators/ctrlWrapper");

const getContacts = ctrlWrapper(async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10} = req.query;
    const result = await listContactsService(page, limit, owner);
    res.status(200).json(result)
})

const getContactById = ctrlWrapper(async (req, res) => {
    const {contactId} = req.params;
    const result = await getContactByIdService(contactId);
    if (!result) {
      throw new HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(result)
})

const addContact = ctrlWrapper(async (req, res) => {
    const {_id: owner} = req.user;
    const result = await addContactService({...req.body, owner});
    res.status(201).json(result);
})

const deleteContact = ctrlWrapper(async (req, res) => {
    const {contactId} = req.params;
    const result = await removeContactService(contactId);
    if (!result) {
      throw new HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json({ message: "contact deleted" })
})

const updateContact = ctrlWrapper(async (req, res) => {
    const { contactId } = req.params;
    const result = await updateContactService(contactId, req.body);
    if (!result) {
        throw new HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(result);
})

const updateStatusContact = ctrlWrapper(async (req, res) => {
    const {contactId} = req.params;
    const result = await updateStatusContactService(contactId, req.body);
    if (!result) {
        throw new HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(result)
})

module.exports = {
    getContacts,
    getContactById,
    addContact,
    deleteContact,
    updateContact,
    updateStatusContact,
}