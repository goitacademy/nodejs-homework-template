const operations = require("../models/contacts");
const { NotFound, BadRequest } = require("http-errors");
const { contactSchema } = require("../validation/contactsSchema");
const listContacts = async (req, res, next) => {
  try {
    const contacts = await operations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const newContact = await operations.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await operations.getContactById(id);
    if (!contact) {
      throw new NotFound("Not Found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await operations.removeContact(id);
    if (!contact) {
      throw new NotFound("Not Found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (Object.keys(req.body).length === 0) {
      throw new BadRequest("Missing fields");
    }
    const newContact = await operations.updateContact(id, req.body);
    if (!newContact) {
      throw new NotFound("Not Found");
    }
    res.json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
};
