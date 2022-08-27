const express = require("express");
const Joi = require("joi");
const createError = require("../../helpers/createError");
const Contact = require("../../models/contacts");

const router = express.Router();

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
});

const favoriteSchema = Joi.object({
favorite: Joi.boolean().required()
})

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find();
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Contact.findById(id);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const result = await Contact.create(req.body);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json({message: "contact deleted" })
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);

    if (error) {
      throw createError(400, error.message);
    }
    const result = await Contact.findByIdAndUpdate(req.params.id, req.body);
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
    const { error } = favoriteSchema.validate(req.body);

    if (error) {
      throw createError(400, "Missing field favorite");
    }
    const result = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;