const express = require("express");
const Joi = require("joi");

const contactsService = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required 'name' field" }),
  email: Joi.string().required().email().messages({
    "any.required": "missing required 'email' field",
    "string.email": "Invalid email format.",
  }),
  phone: Joi.string()
    .required()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      "any.required": "missing required 'phone' field",
      "string.pattern.base":
        "Invalid phone number format. The expected format is (XXX) XXX-XXXX.",
    }),
});

const contactPutSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
})
  .min(1)
  .max(3)
  .custom((value, helpers) => {
    if (!value.name && !value.email && !value.phone) {
      return helpers.error("object.or");
    }
    return value;
  }, "custom validation")
  .unknown(false)
  .messages({
    "object.min": "At least one field (name, email, or phone) is required.",
    "object.max":
      "Only up to three fields are allowed (name, email, or phone).",
    "object.or": "At least one field (name, email, or phone) is required.",
    "object.unknown": "Only 'name', 'email', or 'phone') fields are allowed .",
    "string.email": "Invalid email format.",
    "string.pattern.base":
      "Invalid phone number format. The expected format is (XXX) XXX-XXXX.",
  });

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactPutSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContactById(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
