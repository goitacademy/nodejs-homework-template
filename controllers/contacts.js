const contactMethods = require("../models/contacts");

const listContacts = async (req, res, next) => {
  try {
    const result = await contactMethods.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById= async (req, res, next) => {
    try {
        const { id } = req.params;
    const result = await contactMethods.getContactById(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const result = await contactMethods.addContact();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const result = await contactMethods.removeContact();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const result = await contactMethods.updateContact();
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