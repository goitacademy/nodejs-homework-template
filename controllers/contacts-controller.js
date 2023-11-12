import * as contactsService from "../models/contacts.js";
import Joi from "joi";

const contactAddScheme = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
    "string.base": "name must be text",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
    "string.base": "email must be text",
  }),
  phone: Joi.number().required().messages({
    "any.required": "missing required phone field",
    "number.base": "phone must be number",
  }),
});

const contactUpdateScheme = Joi.object({
  name: Joi.string().messages({
    "string.base": "name must be text",
  }),
  email: Joi.string().messages({
    "string.base": "email must be text",
  }),
  phone: Joi.number().messages({
    "number.base": "phone must be number",
  }),
});

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const result = await contactsService.getContactById(req.params.contactId);
    if (!result) {
      const error = new Error(
        `Contact with id=${req.params.contactId} not found!`
      );
      error.status = 404;
      throw error;
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contactValidate = contactAddScheme.validate(req.body);
    if (contactValidate.error) {
      const error = new Error(contactValidate.error.message);
      error.status = 400;
      throw error;
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const result = await contactsService.removeContact(req.params.contactId);
    if (!result) {
      const error = new Error(`Not found!`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contactValidate = contactUpdateScheme.validate(req.body);
    if (contactValidate.error) {
      const error = new Error(contactValidate.error.message);
      error.status = 400;
      throw error;
    }
    const result = await contactsService.updateContact(
      req.params.contactId,
      req.body
    );
    if (!result) {
      const error = new Error(
        `Contact with id=${req.params.contactId} not found!`
      );
      error.status = 404;
      throw error;
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
};
