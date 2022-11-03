import { Router } from "express";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../../models/contacts.js";
import { schema, validateData } from "../../middleware/validator.js";

const router = Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  if(contacts){
    return res.status(200).json({ data: contacts });
  }
  return res.status(500).json({ message:'Internal server error' });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (contact) {
    return res.status(200).json({ data: contact });
  }
  return res.status(404).json({ message: "Not found" });
});

router.post("/", validateData(schema), async (req, res, next) => {
  const newContact = await addContact(req.body);
  if (newContact) {
    return res.status(201).json({ data: newContact });
  }
  return res.status(400).json({ message: "Such contact has already exist!" });
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contactToDelete = await removeContact(id);
  if (contactToDelete) {
    return res.status(200).json({ message: "contact deleted" });
  }
  return res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", validateData(schema), async (req, res, next) => {
  const id = req.params.contactId;
  const contactToUpdate = await updateContact(id, req.body);
  if (contactToUpdate) {
    return res.status(200).json({ data: contactToUpdate });
  }
  return res.status(404).json({ message: "Not found" });
});

export default router;
