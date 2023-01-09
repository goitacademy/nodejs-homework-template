const express = require("express");
const { postSchema, putSchema } = require("../../schemas/contacts");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  if (postSchema.validate(req.body).error) {
    res
      .status(400)
      .json({ message: postSchema.validate(req.body).error.message });
  } else {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const isRemoved = await removeContact(req.params.contactId);
  if (isRemoved) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  if (putSchema.validate(req.body).error) {
    res
      .status(400)
      .json({ message: putSchema.validate(req.body).error.message });
  } else if (req.body.name || req.body.email || req.body.phone) {
    const updatedContact = await updateContact(req.params.contactId, req.body);
    res.status(200).json(updatedContact);
  } else {
    res.status(400).json({ message: "missing fields" });
  }
});

module.exports = router;
