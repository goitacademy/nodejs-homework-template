const express = require('express')
const Joi = require("joi");
const router = express.Router()

const Contact = require("../../models/contact");
const { createError } = require("../../helpers");
const { authorize } = require("../../middlewares");


const contactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

router.get("/", authorize, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.findOne(
      { owner },
      "-createdAt -updatedAt"
    ).populate("owner", "name, email");
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(contactId);
    const result = await Contact.findById(contactId);
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
    const { error } = contactSchema.validate(req.body);

    if (error) {
      throw createError(400, error.message);
    }

    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw createError(404, "Not Found");
    }
    res.json({ message: "Contact Deleted" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { error } = contactUpdateFavoriteSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing field favorite");
    }

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw createError(404, "Not Found");
    }

    res.json(result);
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
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw createError(404, "Not Found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});


module.exports = router
