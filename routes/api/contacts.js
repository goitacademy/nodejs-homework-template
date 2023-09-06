const express = require("express");

const router = express.Router();

const { HttpError } = require("../../helpers");

const addContactValid = require("../../utils/contactValidation");

const contacts = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const data = await contacts.getContactById(req.params.contactId);
    if (!data) {
      const error = new HttpError(404, "Contact not found");
      throw error;
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addContactValid.validate(req.body);
    if (error) {
      const err = new HttpError(400, error.message);
      throw err;
    }
    const data = await contacts.addContact(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const data = await contacts.removeContact(req.params.contactId);
    if (!data) {
      const error = new HttpError(404, "Contact not found");
      throw error;
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addContactValid.validate(req.body);
    if (error) {
      const err = new HttpError(400, error.message);
      throw err;
    }
    const data = await contacts.updateContact(req.params.contactId, req.body);
    if (!data) {
      const error = new HttpError(404, "Contact not found");
      throw error;
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
