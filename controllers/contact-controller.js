const contactsService = require("../models/contacts");
const HttpError = require("../helper/HttpError");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactByIdb = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with id '${id}' not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    // валидация в декораторе
     const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact with id '${id}' not found`);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};
const updateContact = async (req, res, next) => {
  try {
       // валидация в декораторе
    const { id } = req.params;
    const result = await contactsService.updateContact(id, req.body);
    if (!result) {
      throw HttpError(
        404,
        `Missing fields! Contact with id '${id}' not found.`
      );
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactByIdb,
  addContact,
  removeContact,
  updateContact,
};
