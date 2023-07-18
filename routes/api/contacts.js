import express from "express";

import contactsServer from "../../models/contacts.js";

import { HttpError } from "../../helpers/index.js";

import contactAddSchema from "../../service/JOI/JOI.js";

const contactsRouter = express.Router();

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
    console.log(req);
    const { body } = req;
    const { contactId: id } = req.params;
    const { error } = contactAddSchema.validate(body);
    if (error) throw HttpError(400, error.message);
    const updateContact = await contactsServer.updateContactById(id, body);
    if (!updateContact) {
      throw HttpError(404, `Contact with id=${id} is not found`);
    }
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
