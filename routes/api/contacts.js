import express from "express";
import Joi from "joi";

const router = express.Router();

import { HttpError } from "../../helpers/index.js";

import contactsService from "../../models/contacts.js";

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
    //   const { status = 500, message = "Server error" } = error;
    //   res.status(status).json({
    //     message,
    //   });
  }
});

router.post("/", async (req, res, next) => {
  try {
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
    const result = await contactsService.removeContact(req.params.contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }

    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;
    const contact = await contactsService.updateContact(contactId, req.body);
    if (!contact) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

export default router;
