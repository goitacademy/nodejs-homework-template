const { schema, statusSchema } = require("../../models/schema.js");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts.js");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (e) {
    console.error(e);
  }
});

router.post("/", async (req, res, next) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  const validation = schema.validate(contact);
  if (validation.error) {
    const reqFields = [];
    Object.keys(validation.error._original).forEach(key => {
      if (!validation.error._original[key]) {
        reqFields.push(`${key} - field`);
      }
    });
    const msg = `missing required ${reqFields.join(", ")}`;
    res.status(400).json({ message: msg });
  } else {
    const newContact = await addContact(contact);
    res.status(201).json(newContact);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contactDeleted = await removeContact(req.params.contactId);
  if (contactDeleted) {
    res.json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: "missing fields" });
  }
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  const validation = schema.validate(contact);
  if (validation.error) {
    const reqFields = [];
    Object.keys(validation.error._original).forEach(key => {
      if (!validation.error._original[key]) {
        reqFields.push(`${key} - field`);
      }
    });
    const msg = `missing required ${reqFields.join(", ")}`;
    res.status(400).json({ message: msg });
  } else {
    const contactUpdated = await updateContact(req.params.contactId, contact);
    if (contactUpdated) {
      res.json(contactUpdated);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  }
});

router.put("/:contactId/favorite", async (req, res, next) => {
  const validation = statusSchema.validate(req.body);
  if (validation.error) {
    res.status(400).json({ message: validation.error.message });
  } else {
    const contactUpdated = await updateStatusContact(
      req.params.contactId,
      req.body
    );
    if (contactUpdated) {
      res.json(contactUpdated);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  }
});

module.exports = router;
