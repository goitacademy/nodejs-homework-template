const express = require("express");
const Joi = require("joi");
const { createError } = require("../../helpers");
const contacts = require("../../models/contacts");

const router = express.Router();

const contactsScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (__, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);

    if (!result) {
      throw createError(
        404,
        "User not found :( Check the correctness of requested ID..."
      );
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
    const result = await contacts.addContact(req.body);
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
    const result = await contacts.removeContact(id);
    if (!result) {
      throw createError(
        404,
        "User not found :( Check the correctness of requested ID..."
      );
    }
    res.json({
      message: `Contact with ID ${id} has been successfully deleted!`,
      newListOfContacts: result,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactsScheme.validate(req.body);

    if (error) {
      throw createError(
        400,
        "Some fields are missing or has not a proper type :( Please ensure that all of the necessary data with necessary type for update are provided..."
      );
    }
    const { id } = req.params;
    const result = await contacts.updateContactById(id, req.body);

    if (!result) {
      throw createError(
        404,
        "User not found :( Check the correctness of requested ID..."
      );
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
