const { errorHandler } = require("../heplers");
const contactsApi = require("../models/contacts");

const get = async (req, res, next) => {
  try {
    const result = await contactsApi.listContacts();
    if (!result) {
      throw errorHandler(404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getByID = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await contactsApi.getContactById(id);
    if (!result) {
      throw errorHandler(404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const createNewContact = async (req, res, next) => {
  try {
    const body = req.body;
    await contactsApi.addContact(body);
    res.status(201).json(body);
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;
    console.log(body);
    if (!body) {
      throw errorHandler(400);
    }
    const result = await contactsApi.updateContact(id, body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await contactsApi.removeContact(id);
    if (!result) {
      throw errorHandler(404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  get,
  getByID,
  updateContact,
  deleteContact,
  createNewContact,
};
