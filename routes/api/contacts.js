const express = require("express");
const router = express.Router();
const { addContactValidation } = require("../../middlewares/validation");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contactList = await listContacts();
  res.status(200).json(contactList);
});

router.get("/:contactId", async (req, res, next) => {
  if (!req.params.contactId) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  const contactById = await getContactById(req.params.contactId);

  res.status(200).json(contactById);
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

  const newContact = await addContact({ name, email, phone });

  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  if (!req.params.contactId) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  await removeContact(req.params.contactId);

  res.status(200).json({ message: "The contact was deleted." });
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

  const updatedContact = await updateContact(req.params.contactId, req.body);

  if (!updatedContact) {
    res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(updatedContact);
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
