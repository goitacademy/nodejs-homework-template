const express = require("express");
const Joi = require("joi");

const router = express.Router();
const { HttpError, isValidId } = require("../../helpers");
const contacts = require("../../models/contacts.js");

const Contact = require("../../models/contact.js");

const addSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "missing required phone field" }),
  favorite: Joi.boolean(),
});

const putSchema = Joi.object({
  name: Joi.string().messages({
    "any.required": "name is not valid",
  }),
  email: Joi.string().messages({
    "any.required": "email is not valid",
  }),
  phone: Joi.string().messages({
    "any.required": "phone is not valid",
  }),
  favorite: Joi.boolean(),
});

const patchSchema = Joi.object({ favorite: Joi.boolean().required });
router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", isValidId, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
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
      res.status(400).json({
        message: error.message,
      });
      return;
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", isValidId, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", isValidId, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!req.body || Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }

    const { error } = putSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: error.message,
      });
      return;
    }

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});
router.patch("/:contactId/favorite", isValidId, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!req.body || Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }

    const { error } = patchSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: error.message,
      });
      return;
    }

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
