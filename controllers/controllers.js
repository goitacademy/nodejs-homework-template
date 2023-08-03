const Joi = require("joi");
const contacts = require("../models/contacts");

const { ResponseError } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw ResponseError(404, "Not found");
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
      console.log(error);
      const [path] = error.details[0].path;
      throw ResponseError(400, `missing requaired ${path} field`);
    }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
    if (!result) {
      throw ResponseError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

const put = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      console.log(error);
      const [path] = error.details[0].path;
      throw ResponseError(400, `missing requaired ${path} field`);
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw ResponseError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw ResponseError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  post,
  put,
  remove,
};
