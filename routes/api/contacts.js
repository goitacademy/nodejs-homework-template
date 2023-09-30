import express from "express";
import Joi from "joi";

import * as contactsService from "../../models/contacts.js";

import { HttpError } from "../../helpers/index.js";

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required().message({
    "any.required": `"name" required field`,
  }),
  email: Joi.string().required().message({
    "any.required": `"email" required field`,
  }),
  phone: Joi.string().required().message({
    "any.required": `"phone" required field`,
  }),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "All fields empty");
    }

    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }

    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "All fields empty");
    }

    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;

    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Movie with ${contactId} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
