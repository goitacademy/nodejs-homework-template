const express = require("express");
const router = express.Router();
const { NotFound, BadRequest } = require("http-errors");
// const createError = require('http-errors');
const contactsOperations = require("../../model");

const Joi = require("joi");
const JoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      throw new NotFound();
      // throw new createError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = JoiSchema.validate(req.body);
    if (error) {
      // throw new BadRequest(error.message);
      throw new BadRequest("missing required name field");
    }
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await contactsOperations.removeContact(contactId);
    if (!deleteContact) {
      throw new NotFound();
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = JoiSchema.validate(req.body);
    if (error) {
      throw new BadRequest("missing fields");
    }

    const { contactId } = req.params;

    const updateContact = await contactsOperations.updateContact(
      contactId,
      req.body
    );

    if (!updateContact) {
      throw new NotFound();
    }

    res.json(updateContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
