const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts");
const router = express.Router();
const { HttpError } = require("../../helpers");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": `"name" can't be empty`,
  }),
  email: Joi.string().required().messages({
    "string.empty": `"email" can't be empty`,
  }),
  phone: Joi.string().required().messages({
    "string.empty": `"email" can't be empty`,
  }),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json({ result });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id: ${contactId} not found`);
      // return res.status(404).json({
      //   message: `Contact with id: ${contactId} not found`,
      // });
    }
    res.json({ result });
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
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id: ${contactId} not found`);
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateByID(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id: ${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
