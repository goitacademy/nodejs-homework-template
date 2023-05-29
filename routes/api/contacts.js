const express = require("express");
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const { nanoid } = require("nanoid");
const { createSchema, updateSchema } = require("../../models/utils");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json(listContacts());
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = getById(id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Contact with this id not found" });
  }
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const { error } = createSchema.validate(body);
  if (error) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    const id = nanoid();
    const contact = {
      id: id,
      name: body.name,
      email: body.email,
      phone: body.phone,
    };
    addContact(contact);
    res.status(201).json(contact);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = removeContact(id);
  if (contact) {
    res.json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;
  const { error, value } = updateSchema.validate(body);
  if (error) {
    res.status(400).json({ message: "missing fields" });
  } else {
    const updatedContact = updateContact(id, value);
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  }
});

module.exports = router;
