const express = require("express");
const Joi = require("joi");

const Contact = require("../../models/contact");

const { createError } = require("../../helpers/createError");
const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await Contact.findById(req.params.id);
    console.log(res);
    if (!result) {
      throw createError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }

    const result = await Contact.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await Contact.findByIdAndRemove(req.params.id);
    if (!result) {
      throw createError(404, "Contact not found");
    }
    res.status(204);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing fields");
    }
    const result = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!result) {
      throw createError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const { error } = contactUpdateFavoriteSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing fields");
    }
    const result = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!result) {
      throw createError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
