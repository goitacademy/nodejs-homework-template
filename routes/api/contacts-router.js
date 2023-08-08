import express from "express";
import contactService, { updateContactById } from "../../models/contacts.js";
import { HttpError } from "../../helpers/index.js";
import Joi from "joi";

const contactsRouter = express.Router();

const contactsAddScheme = Joi.object({
  email: Joi.string().required(),
  phone: Joi.string().required(),
  name: Joi.string().required(),
});

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await contactService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactService.getContactById(id);
    if (!result) {
      throw HttpError(400, `Contact with id ${id} not found`);
      // const error = new Error(`Contact with id ${id} not found`);
      // error.status = 404;
      // throw error;
      // return res.status(404).json({
      //   message:
      // })
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    const { error } = contactsAddScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactService.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact with id ${id} not found`);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
   next(error)
  }
});

contactsRouter.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactsAddScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contactService.updateContactById(id, req.body);;
    if (!result) {
      throw HttpError(400, `Contact with id ${id} not found`);
    }
    res.json(result);
  } catch(error) {
    next(error);
  }
});

export default contactsRouter;
