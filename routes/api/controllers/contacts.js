import express from "express";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../../../model/contacts/index";

import {
  validationCreate,
  validationUpdate,
  validationId,
} from "../../../midllewares/validation";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:id", validationId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
});

router.post("/", validationCreate, async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
});

router.delete("/:id", validationId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await removeContact(id);
  if (contact) {
    return res.status(200).json({ message: "contact deleted" });
  }
  res.status(404).json({ message: "Not found" });
});

router.patch("/:id", validationId, validationUpdate, async (req, res, next) => {
  const { id } = req.params;
  const contact = await updateContact(id, req.body);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
});

export default router;
