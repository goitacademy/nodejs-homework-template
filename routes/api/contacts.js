import express from "express";
import Joi from "joi";

import contactsService from "../../models/contacts.js";
import { HttpError } from "../../helpers/index.js";

const contactsRouter = express.Router();

// настройка валидации отправки данных <<<<<<<<<<<<<<<<
const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.getAllContacts();
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
      throw HttpError(404, `Contact with id=${id} not found!`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found!`);
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactToUpdate = req.body;
    const existingContact = await contactsService.getContactById(id);

    if (!existingContact) {
      throw HttpError(404, `Contact with id=${id} not found!`);
    }

    if (contactToUpdate.name) {
      existingContact.name = contactToUpdate.name;
    }
    if (contactToUpdate.email) {
      existingContact.email = contactToUpdate.email;
    }
    if (contactToUpdate.phone) {
      existingContact.phone = contactToUpdate.phone;
    }

    const result = await contactsService.updateContact(id, existingContact);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
