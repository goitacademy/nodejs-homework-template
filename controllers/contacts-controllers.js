const reqError = require("../helpers/reqError.js");
const joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts.js");
const schema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

const getAll = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw reqError(404, "NotFound");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const postContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw reqError(400, "missing required name field");
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) throw reqError(404, "Not found");
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = schema.validate(req.body);
    const result = await updateContact(contactId, req.body);
    if (error) {
      throw reqError(400, "missing fields");
    } else if (!result) {
      throw reqError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  postContact,
  deleteContact,
  update,
};
