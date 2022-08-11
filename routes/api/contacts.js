const express = require("express");
// const { NotFound } = require("http-errors");
const createError = require("http-errors");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
});

const router = express.Router();
const contactOperations = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactOperations.listContacts();
    res.json({ status: "success", code: 200, contacts });
  } catch (error) {
    next(createError.InternalServerError("Server error"));
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const searchedContact = await contactOperations.getContactById(contactId);
    if (!searchedContact) {
      throw createError.NotFound(`Contact with id=${contactId} not found.`);
    }
    res.json({ status: "success", code: 200, searchedContact });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError.BadRequest("missing required name field");
    }
    const newContact = await contactOperations.addContact(req.body);
    res.status(201).json({ status: "success", code: 201, newContact });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await contactOperations.removeContact(contactId);
    if (!removedContact) {
      throw createError.NotFound("Not found");
    }
    res.json({
      status: "success",
      code: 200,
      removedContact,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError.BadRequest("missing fields");
    }
    const { contactId } = req.params;
    const updatingContact = await contactOperations.updateContact(
      contactId,
      req.body
    );
    if (!updatingContact) {
      throw createError.NotFound("Not found");
    }
    res.json({ status: "success", code: 200, updatingContact });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
