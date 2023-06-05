const contactsService = require("../models");
const { HttpError } = require("../helpers");
const schemas = require("../schemas/contactSchema");

const allContacts = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
    console.table(result);
  } catch (error) {
    next(error);
  }
};

const oneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addOneContact = async (req, res, next) => {
  try {
    const { error } = schemas.contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact not found`);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};
const updateById = async (req, res, next) => {
  try {
    const { error } = schemas.contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contactsService.updateContact(
      id,
      req.body,
      contactsService.contactsPath
    );
    if (!result) {
      throw HttpError(404, `Contact not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  allContacts,
  oneContact,
  addOneContact,
  deleteContact,
  updateById,
};
