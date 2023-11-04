const Joi = require("joi");
const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await listContacts();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      msg: "Server error",
    });
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    res.status(200).json(contact);
  } catch (err) {
    res.status(404).json({
      message: "Not found",
    });
  }
});

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.number().required(),
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    console.log(req.body);
    if (error) {
      res.status(400).json({ message: "missing required name field" });
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
