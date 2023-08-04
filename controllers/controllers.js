const contacts = require("../models/contacts");
const { HttpError } = require("../helpers");


const getAllContacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const addContact = async (req, res, next) => {
    try {
        const data = req.body;

        const result = await contacts.addContact(data);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

const updContactById = async (req, res, next) => {
  try {
    const data = req.body;
      const { contactId } = req.params;
      
    const result = await contacts.updateContact(contactId, data);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};
    
const deleteContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;

        const result = await contacts.removeContact(contactId);
        if (!result) {
            throw HttpError(404, "Not Found");
        }
        res.json({ message: "Delete was sucssesful" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllContacts,
    getById,
    addContact,
    updContactById,
    deleteContactById,
};