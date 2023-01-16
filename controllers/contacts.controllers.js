const {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
  } = require("../models/contacts");
  
  const HttpError = require("../helpers/HttpError.js");
  
  async function getContactsService(req, res) {
    const contacts = await listContacts();
    res.json(contacts);
  }
  
  async function getContactService(req, res, next) {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
  
    if (!contact) {
      return next(new HttpError(404, "Contact is not found!"));
    }
  
    return res.json(contact);
  }
  
  async function createContactService(req, res, next) {
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
  
    res.status(201).json(newContact);
  }
  
  async function deleteContactService(req, res, next) {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
  
    if (!contact) {
      return next(new HttpError(404, "No found"));
    }
  
    await removeContact(contactId);
    return res.status(200).json({ message: "Contact deleted" });
  }
  
  async function updateContactService(req, res, next) {
    if (!Object.keys(req.body).length) {
      return next(new HttpError(400, "Missing fields"));
    }
  
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);
  
    if (!updatedContact) {
      return next(new HttpError(404, "Contact not found"));
    }
  
    return res.status(200).json(updatedContact);
  }
  
  module.exports = {
    updateContactService,
    deleteContactService,
    createContactService,
    getContactService,
    getContactsService,
  };