const express = require("express");

const contacts = require("../../models/contacts");

const { HttpError } = require("../../utils/HttpError");
const Joi = require("joi");

const router = express.Router();

const emptySchema = Joi.object()
  .min(1)
  .messages({ "object.min": "Missing fields" });

const contactSchema = Joi.object({
  name: Joi.string().min(5).max(26).required().messages({
    "any.required": "missing required name field",
    "string.pattern.base": "Wrong pattern",
  }),

  phone: Joi.string()
    .pattern(
      new RegExp("^[+]?[(]?[0-9]{1,4}[)]?[-s.]?[0-9]{1,4}[-s.]?[0-9]{1,6}$")
    )
    .required()
    .messages({
      "any.required": "missing required phone field",
      "string.pattern.base": "Wrong pattern",
    }),

  email: Joi.string()
    .pattern(new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"))
    .required()
    .messages({
      "any.required": "missing required email field",
      "string.pattern.base": "Wrong pattern",
    }),
});

router.get("/", async (req, res, next) => {
  const data = await contacts.listContacts();

  res.json(data);
});

router.get("/:contactId", async (req, res, next) => {
  const { params } = req;

  try {
    const data = await contacts.getContactById(params.contactId);

    if (!data) {
      throw HttpError();
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { body } = req;

  try {
    const { error } = contactSchema.validate(body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const data = await contacts.addContact(body);

    if (!data) {
      throw HttpError();
    }

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const {
    params: { contactId },
  } = req;

  try {
    const data = await contacts.removeContact(contactId);

    if (!data) {
      throw HttpError(404, "Not found");
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const {
    params: { contactId },
    body,
  } = req;

  try {
    // if (!Object.keys(body).length) {
    //   throw HttpError(400, "Missing fields");
    // }

    const { error: objectEmpty } = emptySchema.validate(body);
    const { error: missedFields } = contactSchema.validate(body);

    if (objectEmpty || missedFields) {
      throw HttpError(400, objectEmpty?.message || missedFields?.message);
    }

    const data = await contacts.updateContact(contactId, body);

    if (!data) {
      throw HttpError(404, "Not found");
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
