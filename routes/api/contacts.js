const express = require("express");
const Joi = require("joi");

const router = express.Router();

const contacts = require("../../models/contacts");

const { createError } = require("../../helpers/createError");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
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
    if (!result) {
      throw createError(404, "Not found");
      //   res.status(404).json({
      //     message: "Not found",
      //   });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      // можно было в месседж указать error.message
      throw createError(400, "missing required name field");
    }

    const result = await contacts.addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.removeContact(req.params.contactId);
    if (!result) {
      throw createError(404, "Contact not found");
    }
    res.status(204);
  } catch (error) {
    next(error);
  }
});
router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
