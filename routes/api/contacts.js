const express = require("express");
const router = express.Router();
const contactsService = require("../../models");
const HttpError = require("../../helpers");
const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().min(2).required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
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
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `not found`);
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
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }
    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
