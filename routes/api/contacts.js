import express from "express";
import Joi from "joi";

import contactsServer from "../../models/contacts.js";

import { HttpError } from "../../helpers/index.js";

const contactsRouter = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `"name" must be exist` }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": `"phone" must be exist` }),
  email: Joi.string()
    .required()
    .messages({ "any.required": `"email" must be exist` }),
});

contactsRouter.get("/", async (_, res, next) => {
  try {
    const contacts = await contactsServer.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await contactsServer.getContactById(contactId);
    if (!contactById) {
      throw HttpError(404, `Contact with id=${contactId} is not found`);
    }
    res.json(contactById);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = contactAddSchema.validate(body);
    if (error) throw HttpError(400, error.message);
    const newContact = await contactsServer.addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContactById = await contactsServer.removeContact(contactId);
    if (!deleteContactById) {
      throw HttpError(404, `Contact with id=${contactId} is not found`);
    }
    res.json(deleteContactById);
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  try {
    const { body } = req;
    const { contactId } = req.params;
    const { error } = contactAddSchema.validate(body);
    if (error) throw HttpError(400, error.message);
    const updateContact = await contactsServer.updateContactById(
      contactId,
      body
    );
    if (!updateContact) {
      throw HttpError(404, `Contact with id=${contactId} is not found`);
    }
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
