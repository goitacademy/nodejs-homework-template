const express = require("express");
const createError = require("http-errors");

const contactsOperations = require("../../models/contacts.js");
const Joi = require("joi");
const router = express.Router();

// Schema validation for PUT and POST methods
const contactShema = Joi.object({
  name: Joi.string().min(4).max(25).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
});

const shemaUpdate = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[0-9]+$/),
}).min(1);

// Methods implementation

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: "200",
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.getContactById(id);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactShema.validate(req.body);
    if (error) {
      throw createError(400, "missing required field");
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "contact has been deleted",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = shemaUpdate.validate(req.body);
    if (error) {
      throw createError(400, "missing current fields");
    }
    const { id } = req.params;
    const result = await contactsOperations.updateContact(id, req.body);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
