const express = require("express");
const contacts = require("../../models/contacts.js");
const router = express.Router();
const joi = require("joi");

// HTTP ERROR
const HttpError = require("../../helper/HttpError.js");

// Схема Joi
const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});
// Full listContacts
router.get("/", async (req, res) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(error).json({ message: "Server error" });
  }
});

// contact ById
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// ADD CONTACTS
router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(404, message.error);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// CHANG POST (PUT)

router.put("/:id", async (req, res, next) => {
  try {
  } catch (error) {}
});
module.exports = router;
