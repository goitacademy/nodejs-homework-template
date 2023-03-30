const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const { HttpError } = require("../helpers/HttpError");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      throw HttpError(404, `Not found`);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { body } = req.body;
    const newContact = await addContact(body);
    res.json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updContact = await updateContact(contactId);
    if (!updContact) {
      throw HttpError(404, `Not found`);
    }
    res.json(updContact);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getById,
  add,
  update,
  remove,
};
