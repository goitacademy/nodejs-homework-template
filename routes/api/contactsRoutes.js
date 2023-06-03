const express = require("express");
const Joi = require("joi");
const contactsService = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().alphanum().required().messages({ "any.required": "Missing required name field" }),
  email: Joi.string().email().required().messages({ "any.required": "Missing required email field" }),
  phone: Joi.string().min(7).max(11).pattern(/^[0-9]+[-]$/).required().messages({ "any.required": "Missing required phone field" }),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
    
      } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact not found`);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contactsService.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, `Contact not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
