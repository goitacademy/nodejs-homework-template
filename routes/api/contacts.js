const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts");
const HttpError = require("../../helpers/HttpError");
const router = express.Router();

// Data validation ==========================================

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(
      /^(?:\+\d{1,3})?(?:\(?\d{2,3}\)?[-\s]?)?\d{2,4}(?:[-\s]?\d{2,4}){2}$/
    )
    .required(),
});

// Get all contacts =========================================

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Get contact by ID ========================================

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Create a new contact =====================================

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// Update a contact =========================================

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Delete a contact =========================================

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json({
      message: "Delete success!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
