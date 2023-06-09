const express = require("express");

const Joi = require("joi");

const router = express.Router();

const Contact = require('../../models/contact');

const { HttpError } = require("../../helpers");

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().required().email().messages({
    "any.required": `missing required email field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required phone field`,
  }),
  favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
  })
});

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);

    if (!result) {
      throw HttpError(404, `Contact with id: '${contactId}' not found`);
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

    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id: '${contactId}' not found`);
    }

    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw HttpError(404, `Contact with id: '${contactId}' not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { error } = contactUpdateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw HttpError(404, `Contact with id: '${contactId}' not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
