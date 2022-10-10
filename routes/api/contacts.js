const express = require("express");
const Joi = require("joi");

const router = express.Router();

const contactsOperation = require("../../models/contacts.js");

const { RequestError } = require("../../helpers");

const addSchema = Joi.object({
  name: Joi.string().min(3).alphanum().required(),
  email: Joi.string().required(),
  phone: Joi.number().integer().required(),
});

router.get("/", async (req, res, next) => {
  console.log("res", res);
  try {
    const result = await contactsOperation.listContacts();
    console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperation.getContactById(id);
    if (!result) {
      throw RequestError(404, "Not found");
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
      throw RequestError(400, error.message);
    }
    const result = await contactsOperation.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { id } = req.params;
    const result = await contactsOperation.updateContact(id, req.body);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperation.removeContact(id);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
