const {
  getContactsService,
  getContactService,
  createContactService,
  updateContactService,
  deleteContactService,
} = require("../services/contactsServices");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await getContactsService();
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactService(contactId);
    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};

const createContact = async (req, res, next) => {
  try {
    const newContact = await createContactService(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await updateContactService(contactId, req.body);
    res.status(200).json(updatedContact);
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await deleteContactService(contactId);
    res.status(200).json(deletedContact);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};