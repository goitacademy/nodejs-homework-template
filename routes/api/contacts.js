import { Router } from "express";
import { nanoid } from "nanoid";
import Joi from "joi";
import {
  addContact,
  getContactById,
  listContacts,
  updateContact,
  removeContact
} from "../../models/contacts.js";

const router = Router();

const bodySchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email({ maxDomainSegments: 2 }).required(),
  phone: Joi.string().min(9).max(20).required(),
});

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);
  !contactById
    ? res.json({ message: `There is no contact with Id: ${contactId}` })
    : res.json({ contactById });
});

router.post("/", async (req, res, next) => {
  const { value, error } = bodySchema.validate(req.body);
  if (!!error) {
    res.status(400).json({ message: error.message });
    return;
  }
  const newContact = { ...value, id: nanoid() };
  const createdContact = await addContact(newContact);
  res.status(201).json({ createdContact });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await removeContact(contactId);
  !deletedContact
    ? res.status(404).json({
        message: `There is no contact with Id: ${contactId} to remove`,
      })
    : res.json({ message: "Contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { value, error } = bodySchema.validate(req.body);

  if (!!error) {
    res.status(400).json({ message: error.message });
    return;
  }

  const updatedContact = await updateContact(contactId, value);
  !updatedContact
    ? res.status(404).json({
        message: `There is no contact with Id: ${contactId} to update`,
      })
    : res.json({ updatedContact });
});

export default router;
