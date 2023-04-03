const express = require("express");
const router = express.Router();
const Joi = require("joi");

const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers/index");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is a required field`,
    "string.base": `"name" should be a type of string`,
    "string.empty": `"name" cannot be an empty field`,
    "string.min": `"name" should have a minimum length of 2`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" is a required field`,
    "string.base": `"email" should be a type of string`,
    "string.empty": `"email" cannot be an empty field`,
    "string.min": `"email" should have a minimum length of 6`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" is a required field`,
    "string.base": `"phone" should be a type of string`,
    "string.empty": `"phone" cannot be an empty field`,
    "string.min": `"phone" should have a minimum length of 10`,
  }),
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
      throw HttpError(404, `${id} = Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    console.log(error);
    const { name, email, phone } = req.body;
    const result = await contacts.addContact(name, email, phone);
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
      throw HttpError(404, `${id} = Not found`);
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, `${id} = Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
