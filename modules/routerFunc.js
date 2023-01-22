const Joi = require("joi");
const contacts = require("../models/contacts");
const { createError } = require("./errors");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "ru"] },
    })
    .required(),
  phone: Joi.string().required(),
});

const getContacts = async (req, res, next) => {
  try {
    const all = await contacts.listContacts();
    res.json(all);
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(contact);
    }
  } catch (e) {
    next(e);
  }
};

const addContact = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body.name) {
      throw createError(400, `missing required name field`);
    } else if (!body.email) {
      throw createError(400, `missing required email field`);
    } else if (!body.phone) {
      throw createError(400, `missing required phone field`);
    } else {
      const { error } = schema.validate(body);
      if (error) {
        console.log(error);
        throw createError(400, error.message);
      }
      const contact = await contacts.addContact(body);
      res.status(201).json(contact);
    }
  } catch (e) {
    next(e);
  }
};

const editContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const contact = await contacts.updateContact(contactId, body);
    if (Object.keys(body).length === 0) {
      throw createError(400, "missing fields");
    } else if (!contact) {
      throw createError(404, "Not found");
    } else {
      const { error } = schema.validate(body);
      if (error) {
        throw createError(400, error.message);
      }
      res.status(200).json(contact);
    }
  } catch (e) {
    next(e);
  }
};
const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.removeContact(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json({ message: "contact deleted" });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  editContact,
  deleteContact,
};
