const contacts = require("../models/contacts");
const { createError } = require("./errors");

const getContacts = async (req, res, next) => {
  try {
    const all = await contacts.listContacts();
    res.json(all);
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(contact);
    }
  } catch (e) {
    next(e);
  }
};

const addContact = async (req, res, next) => {
  try {
    const body = req.body;
    const newContact = await contacts.addContact(body);
    res.status(201).json(newContact);
  } catch (e) {
    next(e);
  }
};

const editContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const contact = await contacts.updateContact(contactId, body);
    if (contact) {
      return res.status(200).json(contact);
    }
    res.status(404).json({ message: "Not found" });
  } catch (e) {
    next(e);
  }
};
const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.removeContact(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json({ message: "contact deleted" });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  editContact,
  deleteContact,
};
