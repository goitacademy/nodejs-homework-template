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
    const { id } = req.params;
    const result = await contacts.getContactById(id);
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
        const body = req.body;

        const result = await contacts.addContact(body);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

const updContactById = async (req, res, next) => {
  try {
    const body = req.body;
      const { id } = req.params;
      
    const result = await contacts.updateContact(id, body);
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
        const { id } = req.params;

        const result = await contacts.removeContact(id);
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