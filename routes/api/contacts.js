const express = require("express");
const contacts = require("../../models/contacts.js");
const validationSchemas = require("../../validation/contacts.js");

const { contactCreateSchema, contactUpdateSchema } = validationSchemas;

const router = express.Router();

router.get("/", async (req, res) => {
  const contactList = await contacts.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contactList,
    },
  });
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({
    status: "success",
    code: 200,
    data: { contact },
  });
});

router.post("/", async (req, res) => {
  const { error } = contactCreateSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: "missing required name, email, or phone field" });
  }

  const { name, email, phone } = req.body;
  const newContact = await contacts.addContact({ name, email, phone });

  res.status(201).json({
    status: "success",
    code: 201,
    data: newContact ,
  });
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await contacts.removeContact(contactId);
  if (!deletedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res) => {
  const { error } = contactUpdateSchema.validate(req.body);
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (error) {
    return res.status(400).json({ message: "missing fields" });
  }

  const updatedContact = await contacts.updateContact(contactId, { name, email, phone });

  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({
    status: "success",
    code: 200,
    data: {updatedContact},
  });
});

module.exports = router;
