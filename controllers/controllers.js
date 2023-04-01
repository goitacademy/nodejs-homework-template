const contacts = require("../models/contacts");
const { HttpError } = require("../helpers");

const getContacts = async (req, res, next) => {
  try {
    const result = await contacts.getContactsService();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactService(id);
    if (!result) {
      throw HttpError(404); /* при прокиданні помилки try  переривається */
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const result = await contacts.createContactService(req.body);
    if (!result) {
      throw HttpError(400, `Contact with phone ${req.body.phone}  is exist`);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.updateContactService(id, req.body);
    if (!result) {
      throw HttpError(404);
    }
    if (Object.keys(req.body).length === 0) {
      console.log("length:", Object.keys(req.body).length);
      return res.status(400).json({ message: "missing fields" });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await contacts.deleteContactService(id);
    if (!result) {
      throw HttpError(404);
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
