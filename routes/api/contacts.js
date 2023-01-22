const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const {
  addContactValidation,
} = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  if (contacts) {
    res.status(200).json({ contacts });
  }

  next();
});

router.get("/:contactId", async (req, res, next) => {
  const foundContact = await getContactById(req.params.contactId);
  if (foundContact) {
    res.status(200).json({ data: foundContact });
  }
  next();
});

router.post("/", addContactValidation, async (req, res, next) => {
  const newContact = await addContact(req.body);
  if (newContact) {
    res.status(201).json({ data: newContact });
  }
  next();
});

router.delete("/:contactId", async (req, res, next) => {
  const deleteContact = await removeContact(req.params.contactId);
  if (deleteContact) {
    res.status(200).json({ message: "contact deleted", data: deleteContact });
  }
  next();
});

router.put("/:contactId", addContactValidation, async (req, res, next) => {
  const newContact = await updateContact(req.params.contactId, req.body);

  if (newContact) {
    res.status(200).json({ data: newContact });
  }
  next();
});

module.exports = router;
