const express = require("express");
const createError = require("http-errors");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().required(),
});

const contactOperations = require("../../models/contacts");

const router = express.Router();

router.get("/", async (_, res, next) => {
  try {
    const result = await contactOperations.listContacts();

    if (!result) {
      throw createError(404, "not found");
    }

    res.json({ contacts: result });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactOperations.getContactById(id);

    if (!result) {
      throw createError(404, "not found");
    }

    res.json({ contact: result });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const result = await contactOperations.addContact(req.body);

    res.status(201).json({ contact: result });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const { id } = req.params;
    const result = await contactOperations.updateContact(id, req.body);

    if (!result) {
      throw createError(404, "not found");
    }

    res.status(200).json({ contact: result });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactOperations.removeContact(id);

    if (!result) {
      throw createError(404, "not found");
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
