const contactsModel = require("../models/contacts.json");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactsModel.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsModel.getContactById(contactId);
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { body } = req;
  try {
    const newContact = await contactsModel.addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  try {
    const updatedContact = await contactsModel.updateContact(contactId, body);
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    await contactsModel.removeContact(contactId);
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
