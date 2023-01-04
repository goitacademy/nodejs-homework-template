const express = require("express");
const Joi = require("joi");
const router = express.Router();

const Contact = require("../../models/contact");

const { createError } = require("../../helpers/creareError");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const findContactId = await Contact.findById(contactId);
    if (!findContactId) {
      throw createError(404, "Not found");
    }
    res.status(200).json(findContactId);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw createError(404, "Not Found");
    }
    res.status(200).json({
      message: "Contact deleted",
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw createError(404, "Not Found");
    }
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = updateFavoriteSchema.validate(req.body, {
      new: true,
    });
    if (error) {
      throw createError(400, error.message);
    }
    const result = await Contact.findByIdAndUpdate(contactId, req.body);
    if (!result) {
      throw createError(404, "Not Found");
    }
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
