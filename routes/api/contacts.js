const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const router = express.Router();

const contactsSchema = Joi.object({
  name: Joi.string().trim(true).required(),
  email: Joi.string().email().trim(true).required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
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
      throw RequestError({
        status: 400,
        message: "missing required name field",
      });
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw RequestError({ status: 400, message: "missing fields" });
    }
    const { contactId } = req.params;
    const result = await contacts.updateContactById(contactId, req.body);
    if (!result) {
      throw RequestError({ status: 404 });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw RequestError({ status: 404 });
    }
    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
