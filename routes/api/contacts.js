const express = require("express");
const Joi = require("joi");
const { createError } = require("../../helpers");
const Contact = require("../../models/contact");

const router = express.Router();

const contactsScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateContactScheme = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
}).min(1);

const updateContactFav = Joi.object({
  favorite: Joi.boolean().required(),
});

router.get("/", async (__, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
      throw createError(404, "Please ensure that requested ID is correct...");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsScheme.validate(req.body);

    if (error) {
      throw createError(
        400,
        "Some fields are missing or has not a proper type :( Please ensure that all of the necessary data with necessary type for update are provided..."
      );
    }
    const result = await Contact.create(req.body);
    if (!result) {
      throw createError(
        404,
        `User with name ${req.body.name} is already exists in your contacts list :( Unable to add ${req.body.name} as a new user...`
      );
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw createError(
        404,
        "User not found :( Check the correctness of requested ID..."
      );
    }
    res.json({
      message: `Contact with ID ${id} has been successfully deleted!`,
      deletedContact: result,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = updateContactScheme.validate(req.body);

    if (error) {
      throw createError(
        400,
        "Some fields are missing or has not a proper type :( Please ensure that all of the necessary data with necessary type for update are provided..."
      );
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      throw createError(
        404,
        "User not found :( Please ensure that requested ID is correct..."
      );
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const { error } = updateContactFav.validate(req.body);

    if (error) {
      throw createError(400, "OMG! Missing field favorite :(");
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      throw createError(
        404,
        "User not found :( Please ensure that requested ID is correct..."
      );
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
