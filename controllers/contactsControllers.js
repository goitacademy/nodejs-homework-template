const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().required().message({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().required().message({
    "any.required": `missing required email field`,
  }),
  phone: Joi.string().required().message({
    "any.required": `missing required phone field`,
  }),
});

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    const contact = await getContactById(id);
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    if (id) {
      await removeContact(id);
      res.status(200).json({ message: "contact deleted" });
    }
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { error: validationError } = contactAddSchema.validate(req.body);
    if (validationError) {
      const error = new Error(validationError.message);
      error.status = 400;
      throw error;
    } else {
      const newContact = await addContact(req.body);
      res.status(201).json(newContact);
    }
  } catch (error) {
    next(error);
  }
};

const updateContactBody = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    if (!body) {
      const error = new Error("missing fields");
      error.status = 400;
      throw error;
    }
    const updatedContact = await updateContact(id, body);
    if (updatedContact) {
      res.status(200).json(updatedContact);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContact,
  deleteContact,
  createContact,
  updateContactBody,
};
