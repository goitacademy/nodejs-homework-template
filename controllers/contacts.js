const modelsContacts = require("../models/contacts");
const schema = require("../schemas/contacts");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await modelsContacts.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await modelsContacts.getContactById(contactId);

    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const contact = await modelsContacts.addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await modelsContacts.removeContact(contactId);

    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }
  
    const { contactId } = req.params;
    const contact = await modelsContacts.updateContact(contactId, req.body);

    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};