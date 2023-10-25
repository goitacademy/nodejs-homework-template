const Joi = require("joi");

const { HttpError } = require("../helpers");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models");

const contactAddSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": `"title" required field`,
  }),
  director: Joi.string().required(),
});

const listContactsController = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContactController = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "All fields empty");
    }

    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
};

const updateContactController = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "All fields empty");
    }

    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
};
