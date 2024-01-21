import express from "express";
import { addDataSchema, updateDataSchema } from "../../validation.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../../models/contacts.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contactList = await listContacts();
    res.status(200).json({ contactList });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = await getContactById(req.params.contactId);
    if (!contactId) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ contactId });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const validationResult = addDataSchema.validate(req.body);
    if (validationResult.error) {
      console.log(validationResult.error.message);
      return res.status(400).json({ message: "missing required name - field" });
    }
    const postContact = await addContact(req.body);
    res.status(201).json({ postContact });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contacId = await removeContact(req.params.contactId);
    if (!contacId) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ contacId, message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const validationResult = updateDataSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: "missing fields" });
    }
    const contactId = req.params.contactId;
    const changes = await updateContact(contactId, req.body);
    res.status(200).json({ changes });
  } catch (error) {
    next(error);
  }
});

export { router };
