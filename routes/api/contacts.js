import express from "express";
import { RequestError } from "../../helpers/RequestError.js";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from "../../models/contacts.js";
import { addContactSchema } from "../../schemas/contacts.js";

export const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    console.error(error);
  }
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await getContactById(contactId);
    res.json(result);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing required field");
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await removeContact(contactId);
    if (result === null) {
      throw RequestError(404, "Not found");
    }
    res.json({ message: result });
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing fields");
    }
    const result = await updateContact(contactId, req.body);
    if (result === null) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});
