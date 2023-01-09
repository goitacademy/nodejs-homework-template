const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts");
const { createError } = require("../../helpers");
const { authorize } = require("./middlewares");
const router = express.Router();
const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
router.get("/", authorize, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await contacts.find({ owner });
    res.json(result);
  } catch (error) {
    next(error);
  }
});
router.get("/:contactId", authorize, async (req, res, next) => {
  try {
    const { contactId: _id } = req.params;
    const result = await contacts.findById(_id);
    if (!result) {
      throw createError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});
router.post("/", authorize, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const result = await contacts.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});
router.put("/:contactId", authorize, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId: _id } = req.params;
    const result = await contacts.findOneAndUpdate({ _id, owner }, req.body, {
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
router.delete("/:contactId", authorize, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { contactId: _id } = req.params;
    const result = await contacts.findOneAndDelete(_id, owner);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
});
router.patch("/:contactId/favorite", authorize, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { contactId: _id } = req.params;
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing field favorite");
    }
    const result = await contacts.findOneAndUpdate({ _id, owner }, req.body, {
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