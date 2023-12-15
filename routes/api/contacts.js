const express = require("express");
const Joi = require("joi");
const contactsServices = require("../../models/contacts");

const router = express.Router();
const schema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name should be a string",
    "any.required": "Name is required",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required()
    .messages({
      "string.base": "Email should be a string",
      "string.email": "Email format is 'example@mail.com'",
      "any.required": "Email is required",
    }),
  phone: Joi.string()
    .pattern(/^\+380 \d{2} \d{3} \d{4}$/)
    .required()
    .messages({
      "string.base": "Phone should be a string",
      "string.pattern.base": "Phone format is '+380 XX XXX XXXX'",
      "any.required": "Phone is required",
    }),
});

router.get("/", async (req, res, next) => {
  try {
    const data = await contactsServices.listContacts();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contactsServices.getContactById(contactId);

    if (!data) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error: validationResult } = schema.validate(req.body, { abortEarly: false });

    if (validationResult) {
      const errorMessage = validationResult.details
        .map((detail) => detail.message)
        .join(". ");
      const error = new Error(errorMessage);
      error.status = 400;
      throw error;
    }

    const data = await contactsServices.addContact(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contactsServices.removeContact(contactId);

    if (!deletedContact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error: validationResult } = schema.validate(req.body, { abortEarly: false });

    if (validationResult) {
      const errorMessage = validationResult.details
        .map((detail) => detail.message)
        .join(". ");
      const error = new Error(errorMessage);
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const data = await contactsServices.updateContact(contactId, req.body);

    if (!data) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;