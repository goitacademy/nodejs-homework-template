const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const { nanoid } = require("nanoid");

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contacts = await getContactById(contactId);
  if (!contacts) {
    return next(HttpError(404, "Not found"));
  }
  return res.status(200).json(contacts);
});

contactsRouter.post("/", async (req, res, next) => {
  const id = nanoid();
  const { name, email, phone } = req.body;
  contact = {
    id,
    name,
    email,
    phone,
  };

  const newContact = await addContact(contact);
  res.status(201).json(newContact);
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  await removeContact(contactId);
  return res.status(200).json({ message: "contact deleted" });
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const contact = await getContactById(contactId);
  contact.name = name;
  contact.email = email;
  contact.phone = phone;
  const update = await updateContact(contact);
  res.json(update);
});

module.exports = contactsRouter;
