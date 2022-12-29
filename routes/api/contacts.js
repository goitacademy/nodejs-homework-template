const express = require("express");
const router = express.Router();
const Joi = require("joi");

const contactSchema = Joi.object({
  // id: Joi.string().min(1).required(),
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(10).max(23),
});

const contactsOperations = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contacts = await contactsOperations.listContacts();
  res.json({ contacts, message: "template message" });
});

router.get("/:contactId", async (req, res, next) => {
  const result = await contactsOperations.getContactById(req.params.contactId);
  if (!result) {
    res.status(404).json({
      message: `Product with id=${contactId} not found`,
    });
    return result;
  }
  res.status(200).json({ result });
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await contactsOperations.addContact(req.body, res);
    res.status(201).json({ result, message: "template message" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      res.status(404).json({
        message: `Product with id=${contactId} not found`,
      });
    }
    res.status(200).json({ result, message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      res.status(404).json({
        message: `Product with id=${contactId} not found`,
      });
    }
    res.json({ result, message: "template message" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
