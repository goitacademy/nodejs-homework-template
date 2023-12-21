const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  contactBodySchema,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const contactById = await getContactById(contactId);

  if (!contactById) {
    res.status(404).json({ message: "Not Found" });
    return;
  }

  res.json(contactById);
});

router.post("/", async (req, res, next) => {
  const body = req.body;

  const { error } = contactBodySchema.validate(body);
  if (error) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }
  const newContact = await addContact(body);

  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const contactIdParam = req.params.contactId;
  const removedContact = await removeContact(contactIdParam);

  if (!removedContact) {
    res.status(404).json({ message: "Not Found" });
    return;
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const contactIdParam = req.params.contactId;
  const body = req.body;

  const { error } = contactBodySchema.validate(body);
  if (error) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  const updatedContact = await updateContact(contactIdParam, body);
  if (!updatedContact) {
    res.status(404).json({ message: "Not Found" });
    return;
  }

  res.json(updatedContact);
});

module.exports = router;
