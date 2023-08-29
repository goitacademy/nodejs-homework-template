const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts.js");
const { HttpError } = require("../../helpers");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/api/contacts", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    console.log('result: ', result);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/api/contacts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/api/contacts", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/api/contacts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "delete success" });
  } catch (error) {
    next(error);
  }
});

router.put("/api/contacts/:id", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
