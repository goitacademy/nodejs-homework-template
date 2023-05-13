const express = require("express");
const Joi = require("joi");

const contactsService = require("../../models/contacts");

const router = express.Router();

const { HttpError } = require("../../helpers");

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .required()
    .pattern(/^\+?\d{1,3}[- ]?\(?\d{2,3}\)?[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/),
});

router.get("/", async (req, res, next) => {
  try {
    const results = await contactsService.listContacts();
    res.json(results);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await contactsService.getContactById(req.params.contactId);
    console.log(`results222`, result);
    if (!result) {
      throw HttpError(404, `Movie with ${req.params.contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const results = await contactsService.addContact(req.body);
    res.status(201).json(results);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
