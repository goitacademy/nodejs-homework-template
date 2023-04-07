const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

const contactsOperations = require("../models/contacts");

const HttpError = require("../helpers");

const getAll = async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const add = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const result = await contactsOperations.addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};
const updateById = async (req, res, next) => {
  try {
    const validateBody = updateSchema.validate(res.body);

    if (validateBody === {}) {
      throw HttpError(400, "missing required name field");
    }
   
    const { id } = req.params;

    const result = await contactsOperations.updateContact(id, req.body);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
};
