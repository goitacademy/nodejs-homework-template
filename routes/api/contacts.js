import { Router } from "express";
import {
  listContacts,
  getContactById,
  addContact,
} from "../../models/contacts.js";
import Joi from "joi";

const router = Router();

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.required(),
  phone: Joi.required(),
});

router.get("/", async (req, res, next) => {
  const list = await listContacts();
  res.status(200).json(list);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({ message: result.error.details[0].message });
  } else {
    const { id, name, email, phone } = await addContact(result.value);
    res.status(201).json({ id, name, email, phone });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

export default router;
