const express = require("express");
const router = express.Router();
const { addContactValidation } = require("../../middlewares/validation");
const contacts = require("../../models/contacts.json");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  if (!req.params.contactId) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  getContactById(req.params.contactId);

  res.status(200).json(getContactById(req.params.contactId));
});

router.post("/", addContactValidation, async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name) {
    res.status(400).json({ message: `missing required ${name} field` });
  } else if (!email) {
    res.status(400).json({ message: `missing required ${email} field` });
  } else if (!phone) {
    res.status(400).json({ message: `missing required ${phone} field` });
  }

  addContact({ name, email, phone });

  res.status(201).json(addContact({ name, email, phone }));
});

router.delete("/:contactId", async (req, res, next) => {
  if (!req.params.contactId) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  removeContact(req.params.contactId);

  res.status(200).json({ message: "the contact was deleted" });
});

router.put("/:contactId", addContactValidation, async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!req.body) {
    res.status(400).json({ message: "missing fields" });
  }

  if (!name) {
    res.status(400).json({ message: `missing required ${name} field` });
  } else if (!email) {
    res.status(400).json({ message: `missing required ${email} field` });
  } else if (!phone) {
    res.status(400).json({ message: `missing required ${phone} field` });
  }

  updateContact(req.params.contactId, req.body);

  if (!updateContact(req.params.contactId, req.body)) {
    res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(updateContact(req.params.contactId, req.body));
});

// router.patch("/:contactId", patchContactValidation, async (req, res, next) => {
//   const { name, number } = req.body;

//   contacts.forEach((contact) => {
//     if (name) {
//       contact.name = name;
//     }
//     if (number) {
//       contact.number = number;
//     }
//   });

//   res.json({ contacts, status: "success" });
// });

module.exports = router;
