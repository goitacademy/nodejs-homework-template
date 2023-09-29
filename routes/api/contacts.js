import express from "express";
import * as contactsService from "../../models/contacts.js";
import { HttpError } from "../../helpers/index.js";
import Joi from "joi";

const addContactSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "any.required": "field 'name' is missing",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "field 'email' is missing",
  }),
  phone: Joi.string().min(10).max(15).required().messages({
    "any.required": "field 'phone' is missing",
  }),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().min(10).max(15).optional(),
}).or("name", "email", "phone");

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(
        404,
        `Contact with ${contactId} not found
      `
      );
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "All fields are empty");
    }
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const updatedContact = await contactsService.updateContact(
      req.params.contactId,
      req.body
    );

    if (!updatedContact) {
      throw HttpError(
        404,
        `Contact with ${contactId} not found
      `
      );
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  try {
    const deletedContact = await contactsService.removeContact(
      req.params.contactId
    );
    if (!deletedContact) {
      throw HttpError(
        404,
        `Contact with ${contactId} not found
      `
      );
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
