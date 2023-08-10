const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (_, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);

  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(contact);
});

router.post("/", async (req, res, next) => {
  const newContact = await addContact(req.body);

  if (!newContact) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const contact = await updateContact(req.params.contactId, req.body);
  // console.log(`contact.details: ${contact.details}`);
  // console.log(Array.isArray(contact.details));
  if (contact === null) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  if (contact === undefined) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  res.status(200).json(contact);
});

module.exports = router;
