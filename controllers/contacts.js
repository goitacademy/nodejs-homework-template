const contactMethods = require("../models/contacts");

const { httpError } = require("../helpers/httpError");

const listContacts = async (req, res, next) => {
  try {
    const result = await contactMethods.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactMethods.getContactById(id);
    if (!result) {
      throw httpError(404, 'Not found!');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const result = await contactMethods.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactMethods.removeContact(id);
    if (!result) {
      throw httpError(404, "Not found!");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactMethods.updateContact(id, req.body);
     if (!result) {
       throw httpError(404, "Not found!");
     }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};