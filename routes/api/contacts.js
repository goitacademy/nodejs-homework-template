import express from "express";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from "../../models/contacts.js";
import { nanoid } from "nanoid";
import { isReqPostBodyOk, validationSchema } from "../../validation.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await getContactById(contactId);
    if (contacts?.length === 0)
      return res.status(404).json({ message: "Not found" });
    else return res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const checkBody = isReqPostBodyOk(req.body);

    const { value, error } = validationSchema.validate(req.body);
    console.log(error);
    if (!checkBody)
      return res.status(400).json({ message: "missing required name - field" });
    if (error) return res.status(400).json({ message: `${error}` });
    const { name, email, phone } = req.body;
    const contactWithId = { id: nanoid(), name, email, phone };

    await addContact(contactWithId);
    res.status(201).json(contactWithId);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await removeContact(contactId);
    if (deleteContact === 404)
      return res.status(404).json({ message: "Not found" });
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const { value, error } = validationSchema.validate(req.body);
    if (!(name || email || phone))
      return res.status(400).json({ message: "missing fields" });

    if (error) return res.status(400).json({ message: `${error}` });

    const contactPut = await updateContact(contactId, req.body);
    res.json(contactPut);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export { router };
