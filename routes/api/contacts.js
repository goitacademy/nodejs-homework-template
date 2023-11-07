const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts");

const contactShema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {});

router.post("/", async (req, res, next) => {
  const response = contactShema.validate(req.body);
  console.log(response);
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {});

router.put("/:contactId", async (req, res, next) => {});

module.exports = router;
