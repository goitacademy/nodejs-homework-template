const express = require("express");
const Joi = require("joi");

const contactsApi = require("../../models/contacts");
const errorHandler = require("../../heplers/errorHandler");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsApi.listContacts();
    if (!result) {
      throw errorHandler(404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await contactsApi.getContactById(id);
    if (!result) {
      throw errorHandler(404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactSchema.validate(body);
    if (error) {
      throw errorHandler(400);
    }
    await contactsApi.addContact(body);
    res.json(201, body);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await contactsApi.removeContact(id);
    if (!result) {
      throw errorHandler(404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;
    const { error } = contactSchema.validate(body);
    if (!body || error) {
      throw errorHandler(400);
    }
    const result = await contactsApi.updateContact(id, body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
