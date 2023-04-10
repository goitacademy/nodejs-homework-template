const express = require("express");
const Joi = require("joi");
// const {  } = require("../../app");
const {
  getContactById,
  // addContact,
  listContacts,
  // updateContact,
  removeContact,
} = require("../../models/contacts");
const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const result = await listContacts();
  res.status(200).json(result);
});

router.get("/:contactId", async (req, res, next) => {
  console.log(req.params.contactId);
  const result = await getContactById(req.params.contactId);
  console.log(result);
  res.status(200).json(result);
});

router.post("/", async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  console.log(error);
  if (error) {
    res.status(400).json({ error: error.message });
  }
  res.status(201).json({ message: "created" });
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await removeContact(req.params.contactId);
  if (!result) {
    res.status(404).json({ message: "Not Found" });
  }
  res.status(200).json({
    data: result,
    message: "Deleted",
  });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
