import Joi from "joi";

import contactsService from "../models/contacts.js";

import { HttpError } from "../helpers/index.js";

const contactsAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      allowFullyQualified: true,
    })
    .required()
    .messages({
      "any.required": `missing required email field`,
    }),
  phone: Joi.string()
    .pattern(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/, "phone number")
    .min(2)
    .max(20)
    .required()
    .messages({
      "any.required": `missing required phone field`,
    }),
});

const getAll = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addNew = async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default { getAll, getById, addNew, deleteById, updateById };
