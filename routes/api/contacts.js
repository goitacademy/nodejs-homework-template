const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const {
  schemaAddContact,
  schemaUpdateContact,
} = require("../../schemas/createContactSchema");
const createError = require("../../utils/createError");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schemaAddContact.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const contact = await addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    await removeContact(req.params.contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schemaUpdateContact.validate(req.body);
    if (error) {
      if (
        error.message ===
        '"value" must contain at least one of [name, email, phone]'
      )
        error.message = "missing fields";
      throw createError(400, error.message);
    }
    const contact = await updateContact(req.params.id, req.body);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
