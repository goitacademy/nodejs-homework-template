const joi = require("joi");

const contactServis = require("../models/contacts");
const { HttpError } = require("../helper/HttpError");

const joi = require("joi");

const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

const getAllContacts = async (req, res) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.find(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const postContact = async (req, res, next) => {
  try {
    const { error } = Schema.validate(req.body);
    if (error) {
      throw HttpError(404, message.error);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
const addContact = async (req, res, next) => {
  try {
    const { error } = Schema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const { id } = req.params;
    const result = await contacts.updateById(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const removeContacts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.remove(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "Delete contact" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactsById,
  postContact,
  addContact,
  removeContacts,
};
