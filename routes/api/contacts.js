const express = require("express");
const createError = require("http-errors");
const Joi = require("joi");

const contacts = require("../../models/contacts");

const contactsSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().min(9).max(70).required(),
  phone: Joi.number().min(0.01).required(),
});

const router = express.Router();

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
      throw new createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw new createError(400, "missing required name field");
    }
    const { name, email, phone } = req.body;
    const result = await contacts.addContact({ name, email, phone });
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
      throw new createError(404,  "Not found")
    }
    res.json({message: "contact deleted"});
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw new createError(400, "missing fields");
    }
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const result = await contacts.updateContact({
      contactId,
      name,
      email,
      phone,
    });
    if (!result) {
      throw new createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
