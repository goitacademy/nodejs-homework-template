import express from "express";

import contactsService from "../../models/contacts.js";
import HttpError from "../../helpers/HttpError.js";

import Joi from "joi";

const contactsRouter = express.Router();

const constactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
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

contactsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactsById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    const { error } = constactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContacts(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }

  res.json({ message: "template message" });
});

contactsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) { 
      throw HttpError(404)
    }
    res.json({
      message: "Contact removed"
    });
  }
  catch (error) {
    next(error);
  }
  
});

contactsRouter.put("/:id", async (req, res, next) => {
  try {
     const { error } = constactsAddSchema.validate(req.body);
     if (error) {
       throw HttpError(400, error.message);
    }
    const { id } = req.params;

    const result = await contactsService.updateContactsById(id, req.body);
     if (!result) {
       throw HttpError(404);
     }
     res.status(201).json(result);
  }
  catch (error) {
    next(error);
  }
});

export default contactsRouter;
