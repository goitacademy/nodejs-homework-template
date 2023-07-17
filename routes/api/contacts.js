import express from "express";
import Joi from "joi";

import contactsService from "../../models/contacts.js";

import { HttpError } from "../../helpers/index.js";

const router = express.Router();

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" missing field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" missing field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" missing field`,
  }),
});

router.get("/", async (request, response, next) => {
  try {
    const result = await contactsService.listContacts();
    response.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (request, response, next) => {
  try {
    const { contactId } = request.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    response.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const { error } = contactsAddSchema.validate(request.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(request.body);
    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (request, response, next) => {
  try {
    const { error } = contactsAddSchema.validate(request.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = request.params;
    const result = await contactsService.updateContact(contactId, request.body);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    response.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (request, response, next) => {
  try {
    const { contactId } = request.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    response.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
