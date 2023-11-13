import contactService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import Joi from "joi";

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string()
    .length(13)
    .pattern(/[0-9]?()+?[0-9]+$/)
    .required()
    .messages({
      "any.required": "missing required phone number field",
    }),
});

const contactsUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
    .length(13)
    .pattern(/[0-9]?()+?[0-9]+$/),
});

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactId = async (req, res, next) => {
  // Вказуємо next для пошуку далі
  try {
    const { contactId } = req.params; // Деструктуризуэмо запит req та дістаємо ключ contactId(ключ перед : значення після)
    const result = await contactService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error); // Вказуємо error для пошук функції яка обробляє помилки
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContacts = async (req, res, next) => {
  try {
    const { error } = contactsUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContacts = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = contactService.deleteContact(contactId);

    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts,
  getContactId,
  addContact,
  updateContacts,
  deleteContacts,
};
