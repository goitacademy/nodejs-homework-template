const express = require("express");
const {
  getContactById,
  listContacts,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const {
  contactValidation,
} = require("../../validation/contactsValidation");

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
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return next();
  }
  res.status(200).json(contact);
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactValidation.validate(req.body, {
      abortEarly: false,
    });
    if (typeof error !== "undefined") {
      return res
        .status(400)
        .send(error.details.map((err) => err.message).join(","));
    }
    const contact = await addContact(req.body);
    if (!contact) {
      res
        .status(400)
        .json({ message: "missing required name field" });
    }
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    console.error(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = contactValidation.validate(req.body, {
      abortEarly: false,
    });
    if (typeof error !== "undefined") {
      return res.status(400).json({ message: "missing fields" });
    }
    const contact = await updateContact(contactId, req.body);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
