const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../services/index");

const {
  validationAddContact,
  validationUpdateContact,
} = require("../../validation/createContactValidation");

const createError = require("../../helpers/createError");

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
    const { error } = validationAddContact.validate(req.body);
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
    const { error } = validationUpdateContact.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const contact = await updateContact(req.params.contactId, req.body);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
