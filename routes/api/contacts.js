const express = require("express");

const contacts = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const router = express.Router();

const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
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
      throw RequestError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const contact = req.body;
    const { error } = addSchema.validate(contact);
    if (error) {
      throw RequestError(400, error.message);
    }

    const result = await contacts.addContact(contact);
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
      throw RequestError(404);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const contact = req.body;
    if (Object.keys(contact).length === 0) {
      throw RequestError(400, "missing fields");
    }
    const { error } = addSchema.validate(contact);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, contact);
    if (!result) {
      throw RequestError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
