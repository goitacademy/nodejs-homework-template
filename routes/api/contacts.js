const express = require("express");
const server = require("../../models/contacts");
const Joi = require("joi");
const createError = require("../../helpers/createError");

const router = express.Router();

const newContacts = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const editingContacts = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await server.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await server.getContactById(contactId);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = newContacts.validate(req.body);

    if (error) {
      throw createError(400, "missing required name field");
    }
    const result = await server.addContact(req.body);
    res.status(201).json({ result, message: "template message" });
    res.json();
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await server.removeContact(contactId);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json({ result, message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = editingContacts.validate(body);

    if (error || !Object.keys(body).length) {
      throw createError(400, "missing fields");
    }
    const { contactId } = req.params;

    const result = await server.updateContact(contactId, body);

    if (!result) {
      throw createError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
  // res.json({ message: "template message" });
});

module.exports = router;
