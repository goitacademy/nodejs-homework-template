const express = require("express");
const Joi = require("joi");
const router = express.Router();

const contactsOparations = require("../../models/contacts");
const { createError } = require("../.././helpers/createError");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOparations.listContacts();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const findContactId = await contactsOparations.getContactById(contactId);
    if (!findContactId) {
      throw createError(404, "Not found");
    }
    res.status(200).json(findContactId);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const result = await contactsOparations.addContact(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOparations.removeContact(contactId);
    if (!result) {
      throw createError(404, "Not Found");
    }
    res.status(200).json({
      message: "Contact deleted",
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsOparations.updateContact(contactId, req.body);
    if (!result) {
      throw createError(404, "Not Found");
    }
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
