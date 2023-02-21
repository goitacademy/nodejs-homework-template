const express = require("express");

const router = express.Router();

const {
  schema,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({
    contacts: contacts,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    res.status(404).json({
      message: "Not found",
    });
  }
  res.status(200).json({
    contact: contact,
  });
});

router.post("/", async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "missing required name field",
    });
  }
  const contact = await addContact(req.body);
  res.status(201).json({
    contact: contact,
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    await removeContact(contact.id);
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "missing fields",
    });
  }

  const contact = await getContactById(req.params.contactId);
  if (contact) {
    const updatedContact = await updateContact(contact.id, req.body);
    res.status(200).json({ updatedContact });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
