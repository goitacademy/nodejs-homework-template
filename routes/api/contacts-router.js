import express from "express";
import contactsService from "../../models/contacts/contacts.js";
import { HttpError } from "../../helpers/index.js";
import Joi from "joi";

const contactsRouter = express.Router();

const contactAddSchema = Joi.object({
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
    const result = await contactsService.getAllContacts();
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
      // const error = new Error(`Movie with id=${contactId} not found`);
      // error.status = 404;
      // throw error;
      throw HttpError(404, `Movie with id=${contactId} not found`);
      // return res.status(404).json({
      //   message: `Movie with id=${contactId} not found`,
      // });
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

    const newContact = await contactsService.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    // console.log(req.body)
    const { contactId } = req.params;
    const result = await contactsService.updateContactById(contactId, req.body);
    console.log(result);
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
