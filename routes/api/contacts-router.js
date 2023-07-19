import express from "express";
import Joi from "joi";
import contactsService from "../../models/contacts.js";

import { HttpError } from "../../helpers/index.js";

const contactsRouter = express.Router();

const contactsAddSchema = Joi.object({
  name: Joi.string().min(3).max(33).required().messages({
    "string.empty": "Name is required. Please provide a name.",
    "string.min": "Name should have a minimum of {#limit} characters.",
    "string.max": "Name should have a maximum of {#limit} characters.",
  }),
  email: Joi.string().email().required().messages({
    "string.email":
      "Invalid email format. Please provide a valid email address.",
    "any.required": "Email is required. Please provide an email address.",
  }),
  phone: Joi.string()
    .pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Invalid phone number format. Please provide a valid phone number.",
      "any.required":
        "Phone number is required. Please provide a phone number.",
    }),
});

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `contact with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
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
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `contact with id=${contactId} not found`);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `contact with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
