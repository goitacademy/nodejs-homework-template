const {
  getContactsService,
  getContactService,
  removeContactService,
  addContactService,
  updateContactService,
} = require("../services/contactsServices");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await getContactsService();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contact = await getContactService(req.params.contactId);
    console.log(contact);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const newContact = await addContactService(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const updatedContact = await updateContactService(id, req.body);

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const removedContact = await removeContactService(req.params.contactId);
    res.status(200).json(removedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
};
