const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

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
  const { body } = req.body;
  const newContact = await addContact(body);
  res.status(201).json(newContact);
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = contactsRouter;
