import { Router } from "express";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from "../../model";
import {
  validateCreate,
  validateUpdate,
} from "../api/validation";

const router = new Router();

router.get("/", async (_req, res, _next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:id", async (req, res, _next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
});

router.post("/", validateCreate, async (req, res, _next) => {
  const newContact = await addContact(req.body);
  return res.status(201).json(newContact);
});

router.delete("/:id", async (req, res, _next) => {
  const { id } = req.params;
  const delContact = await removeContact(id);
  if (delContact) {
    return res.status(200).json({ message: "contact deleted" });
  }
  res.status(404).json({ message: "Not found" });
});

router.put("/:id", validateUpdate, async (req, res, _next) => {
  const { id } = req.params;
  const updContact = await updateContact(id, req.body);
  if (updContact) {
    return res.status(200).json(updContact);
  }
  res.status(404).json({ message: "Not found" });
});

export default router;