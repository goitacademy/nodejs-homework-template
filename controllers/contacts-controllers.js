const Joi = require("joi");

const contacts = require("../models/contacts");

const { HttpError } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required "name"`,
    "string.empty": `"name" cannot be empty`,
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": `missing required "email"`,
      "string.empty": `"email" cannot be empty`,
    }),
  phone: Joi.number().required().messages({
    "any.required": `missing required "phone"`,
    "string.empty": `"phone" cannot be empty`,
  }),
});

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

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

const updateContactById = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContactById,
};
