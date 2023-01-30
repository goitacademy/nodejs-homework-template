const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp(/^[A-Za-z]+\s[A-Za-z]+$/))
    .required(),
  email: Joi.string()
    .pattern(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
    .required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    if (!result) throw Error;
    res.status(200).json(result);
  } catch (error) {
    next(res.status(404).json({ message: "Contact not found" }));
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) throw Error(error);
    const result = await contacts.addContact(req.body);
    res.status(201).json(result)
  } catch (error) {
    next(
      res.status(400).json({ message: error.message })
    );
  }
});

router.delete("/:contactId", async (req, res, next) => {
try {
  const result = await contacts.removeContact(req.params.contactId);
  if (!result) throw Error;
  res.status(200).json({message: "Contact deleted"});
} catch (error) {
  next(res.status(404).json({ message: "Contact not found" }));
}
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) throw Error(error);
    const result = await contacts.updateContact(req.params.contactId, req.body);
    if (result === null) {
    res.status(404).json({message: 'Not found'});
    };
    res.status(200).json(result);
  } catch (error) {
    next(res.status(400).json({ message: error.message }));
  }
});

module.exports = router;
