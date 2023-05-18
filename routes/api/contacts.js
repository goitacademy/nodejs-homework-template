const express = require("express");
const Joi = require("joi");
const router = express.Router();

const contacts = require("../../models/contacts");

const scheme = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = scheme.validate(req.body);
    if (error) {
      const errors = new Error(error.message);
      error.status = 400;
      throw errors;
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = scheme.validate(req.body);
    if (error) {
      const errors = new Error(error.message);
      error.status = 400;
      throw errors;
    }
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
