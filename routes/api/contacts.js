const express = require("express");
const Joi = require("joi");

const dotenv = require("dotenv");
dotenv.config();
const { createError } = require("../../helpers");
const authorize = require("../../middlewares");

const Contact = require("../../models/contact");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  favorite: Joi.boolean(),
});
const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

router.get("/", authorize, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 3, favorite } = req.query;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find({ owner, favorite })
      .populate("owner", "email subscription")
      .skip(parseInt(skip))
      .limit(limit);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", authorize, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", authorize, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const contact = await Contact.create({ ...req.body, owner });
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await Contact.findByIdAndRemove(contactId);
    if (!contacts) {
      throw createError(404, "Not found");
    }
    res.json({
      message: "Contact deleted",
      code: 200,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});
router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { error } = favoriteSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
