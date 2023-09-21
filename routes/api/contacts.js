const express = require("express");
const { HttpError } = require("../../helpers");
const contacts = require("../../models/contacts")
const Joi = require("joi");

const router = express.Router();

// Joi shema for validate req user data
const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.min": '"name" must be at least 3 characters long',
    "string.max": '"name" must be at most 50 characters long',
    "string.empty": '"name" cannot be an empty field',
    "any.required": '"name" is a required field',
  }),
  email: Joi.string().email().required().messages({
    "string.email": '"email" must be a valid email',
    "string.empty": '"email" cannot be an empty field',
    "any.required": '"email" is a required field',
  }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({
      "string.pattern.base": '"phone" must be in the format (XXX) XXX-XXXX',
      "string.empty": '"phone" cannot be an empty field',
      "any.required": '"phone" is a required field',
    }),
});

// Routes
router.get("/", async (_, res,next) => {
  try {
    const result = await contacts.listContacts();
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404);
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {error} = userSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.details[0].message);
    }
    const result = await contacts.addContact(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
      const { contactId } = req.params;
      const result = await contacts.removeContact(contactId);
      if (!result) {
        throw HttpError(404);
      }
      return res.json({ "message": "Contact deleted" });
  } catch (error) {
    next(error);
  }


});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.details[0].message);
    }

    const { contactId } = req.params;
    const result = await contacts.updateContactById(contactId, req.body);
    if (!result) {
      throw HttpError(404);
    }

    return res.status(200).json(result);

  } catch (error) {
    next(error);
  }
});

module.exports = router;
