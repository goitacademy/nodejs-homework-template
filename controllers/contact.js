const Joi = require("joi");

const { RequestError } = require("../helpers");

const contacts = require("../models/contacts");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  phone: Joi.string().required(),
});

const getAll = async (req, res, next) => {
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
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
      throw RequestError(404, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
const update = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
      throw RequestError(404, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }

    res.json({
      message: "Delete success",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteById,
};
