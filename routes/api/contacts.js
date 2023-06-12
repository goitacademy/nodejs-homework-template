const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(1).required(),

  phone: Joi.string()
    .regex(/^[0-9]{9}$/)
    .messages({ "string.pattern.base": `Phone number must have 9 digits.` })
    .required(),

  email: Joi.string().email().min(3).required(),
});

router.get("/", async (req, res, next) => {
  try {
    data = await contacts.listContacts();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    data = await contacts.getContactById(req.params.contactId);
    if (data) {
      return res.json(data);
    }
    res.status(404).json({
      status: "Not found",
      code: 404,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const validationError = schema.validateAsync(req.body);
    if (validationError.error) {
      res.json({
        message: "validation error",
      });
    }
    const contact = await contacts.addContact(req.body);
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    data = await contacts.removeContact(req.params.contactId);
    if (data) {
      return res.json({
        message: `contact with ${req.params.contactId} deleted`,
      });
    }
    return res.json({ message: "contact not found" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const validationError = schema.validateAsync(req.body);
    if (validationError.error) {
      res.json({
        message: "validation error",
      });
    }
    const contact = await contacts.updateContact(
      req.params.contactId,
      req.body
    );
    console.log(contact)
    if (contact) {
      return res.json(contact);
    } else {
      res.status(404).json({
        status: "Not found",
        code: 404,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
