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
  phone: joi.number().required(),
});
// Full listContacts
router.get("/", async (req, res) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
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

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {}
});
module.exports = router;
