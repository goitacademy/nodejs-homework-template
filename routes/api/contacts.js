import express from "express";
import Joi from "joi";

import contactsOperations from "../../models/contacts.js";
import { HttpError } from "../../helpers/index.js";

const contactsRouter = express.Router();

const addContactSchema = Joi.object({
  // name: Joi.string().alphanum().required(),
  // email: Joi.string()
  //   .email({
  //     minDomainSegments: 2,
  //     tlds: { allow: ["com", "net"] },
  //   })
  //   .required(),
  // phone: Joi.string().alphanum().required(),
  name: Joi.string().required().messages({
    "any.required": "Name must be exist",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email must be exist",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Phone must be exist",
  }),
});

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;
      // return res.status(404).json({
      //   message: "Not found",
      // });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json({ message: "Delite succes" });
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
