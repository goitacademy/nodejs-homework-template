const Joi = require("joi");

const { HttpError } = require("../helpers");

const { controllerWrapper } = require("../decorators");

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
  const result = await listContacts();
  res.json(result);
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(result);
};

const addContactController = async (req, res, next) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await addContact(req.body);
  res.status(201).json(result);
};

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json({ message: "Delete success" });
};

const updateContactController = async (req, res, next) => {
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
};

module.exports = {
  listContactsController: controllerWrapper(listContactsController),
  getContactByIdController: controllerWrapper(getContactByIdController),
  addContactController: controllerWrapper(addContactController),
  removeContactController: controllerWrapper(removeContactController),
  updateContactController: controllerWrapper(updateContactController),
};
