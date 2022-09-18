const express = require("express");
const RequestError = require("../../helpers/RequestError");
const contacts = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();

const Schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listcontacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (result === null) {
      throw RequestError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = Schema.validate(req.body);
    const result = await contacts.addContact(req.body);
    if (error) {
      throw RequestError(400, "missing required name field");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (result === null) {
      throw RequestError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = Schema.validate(req.body);
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (error) {
      throw RequestError(400, "missing fields");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
