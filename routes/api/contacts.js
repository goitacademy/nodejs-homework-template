import express from "express";
import {
  getContactById,
  listContacts,
  addContact,
  removeContact,
  updateContact,
} from "../../models/contacts.js";
import { HttpError } from "../../helpers/HttpError.js";
import { schemaAdd, schemaUpdate } from "../../helpers/schema.js";

export const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const data = await getContactById(id);
    if (!data) {
      throw HttpError(404, `Contact with Id: ${id} not found`);
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    const { error } = schemaAdd.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const data = await addContact(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const deleting = await removeContact(id);
    if (!deleting) return HttpError(404, "Not found");
    return res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const { error } = schemaAdd.validate(req.body);
    if (error) throw HttpError(400, "missing fields");
    const newContact = await updateContact(id, req.body);
    if (!newContact) throw HttpError(404, "Not found");
    return res.json(newContact);
  } catch (error) {
    next(error);
  }
});
