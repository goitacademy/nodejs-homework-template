import express from "express";

import Joi from "joi";

import contactsService from "../../models/contacts.js";

import { HttpError } from "../../helpers/index.js";

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "any.required": `"name" must be exist`,
  }),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/) //"123-456-7890"
    .required()
    .messages({
      "string.pattern.base": `Phone number must have schema "(***) ***-****".`
    }),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string()
    .regex(/^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/) //"123-456-7890"    
    .messages({
      "string.pattern.base": `Phone number must have schema "(***) ***-****".`
    }),
});

const contactsRouter = express.Router();

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
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
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

contactsRouter.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contactsService.updateContactById(id, req.body);
    // console.log('result: ', result);

    if (!result) {
      throw HttpError(404, `Contacts with id=${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
