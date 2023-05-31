const express = require("express");
const Joi = require("joi");

const contactsControl = require("../../models/contacts");

const router = express.Router();

const { HttpError } = require("../../helpers/index");

const contactsScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsControl.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = contactsControl.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with id ${id} was not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = contactsControl.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
