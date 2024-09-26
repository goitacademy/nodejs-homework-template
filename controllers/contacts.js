const contacts = require("../models/contacts");

const Joi = require("joi");

const { HttpError } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const post = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json({ message: "Removed succesfull" });
  } catch (error) {
    next(error);
  }
};

const put = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  post,
  remove,
  put,
};
