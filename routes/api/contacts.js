const express = require("express");
const joi = require("joi");

const router = express.Router();
const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers/HttpError");

const validationSchema = joi.object({
  name: joi.string().required,
  email: joi.string().required,
  phone: joi.string().required,
});

router.get("/", async (__, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "This id doesn't exist");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newUser = req.body;
    const { error } = validationSchema.validate(newUser);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(newUser);
    if (!result) {
      throw HttpError(404, "This contact doesn't exist");
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {}
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = validationSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {}
});

module.exports = router;
