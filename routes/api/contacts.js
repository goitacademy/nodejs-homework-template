const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts");
const { createError } = require("../../helpers/index");
const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json(message);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getById(id);
    if (!result) {
      //= exemple-1 =//
      // res.status(404).json({ message: "Not found" });
      // return;

      //= exemple-2 =//
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;

      //= correct-exemple =//
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    //= exemple-1 =//
    // res.status(500).json({
    //   message: error.message,
    // });

    //= exemple-2 =//
    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json(message);

    //= correct-exemple =//
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  // const { id } = req.params;
  // console.log(id);
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw createError(404);
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;

    const { error } = contactAddSchema.validate(body);
    if (error) {
      throw createError(400, error.message);
    }

    const result = await contacts.updateContact(id, body);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
