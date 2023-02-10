const express = require("express");
const HttpError = require("../../helpers/HttpError");
const contacts = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();

const addShema = Joi.object({
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
    const { contactId: id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with id ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addShema.validate(req.body);
    if (error) {
      throw HttpError(400, `Missing ${error.message} field`);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId: id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact with id ${id} not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addShema.validate(req.body);
    if (error) {
      throw HttpError(400, `Missing ${error.message} field`);
    }
    const { contactId: id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id ${id} not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
