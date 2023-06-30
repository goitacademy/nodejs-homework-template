const contacts = require("../models/contacts");
const Joi = require("joi");

const validation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

async function addContact(req, res, next) {
  try {
    const { name, email, phone } = req.body;
    const { error } = validation.validate({ name, email, phone });
    if (error) {
      return res.status(400).json({
        message: "missing required name field",
      });
    }
    const result = await contacts.addContact({ name, email, phone });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function updateById(req, res, next) {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const { error } = validation.validate({ name, email, phone });
    if (error) {
      return res.status(400).json({
        message: "missing fields",
      });
    }
    const result = await contacts.updateContact(contactId, {
      name,
      email,
      phone,
    });
    if (result === null) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function removeContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (result === null) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.status(200).json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
}

async function getContacts(req, res, next) {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function getContactById(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addContact,
  updateById,
  removeContact,
  getContacts,
  getContactById,
};
