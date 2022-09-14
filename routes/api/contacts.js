const express = require("express");
const createError = require("../../helpers/createError");
const router = express.Router();
const contacts = require("../../models/contacts");
const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
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
    const contactId = req.params.contactId;
    const data = await contacts.getContactById(`${contactId}`);

    if (!data) {
      throw createError(404);
    }
    res.json(data);
  } catch (error) {
    next();
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { name, email, phone } = req.body;
    const result = await contacts.addContact(name, email, phone);
    res.status(200).json(result);
  } catch (error) {
    next(res.json(error.status, { message: error.message }));
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(`${contactId}`);
    if (!result) {
      throw createError(404);
    }
    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next();
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const result = await contacts.updateContact(
      `${contactId}`,
      name,
      email,
      phone
    );
    if (!result) {
      throw createError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(res.json(error.status, { message: error.message }));
  }
});

module.exports = router;
