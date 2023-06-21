const Joi = require("joi");

const contacts = require("../models/contacts");
// const { HttpError } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().max(30).required(),
});

const getAll = async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    if (!data) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params;
    const data = await contacts.getById(id);
    if (!data) {
      // throw HttpError(404, "Can't fetch contacts by id");
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
    const data = await contacts.addContact(req.body);
    if (!data) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
    const id = req.params;
    console.log(id);
    const data = await contacts.updateContact(id, req.body);
    if (!data) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const id = req.params;
    const data = await contacts.removeContact(id);
    if (!data) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, add, updateById, deleteById };
