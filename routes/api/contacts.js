const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

const validateSchemaPost = Joi.object({
  name: Joi.string().trim().min(2).max(30).required(),
  email: Joi.string().email({ tlds: true }).required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
    .required(),
});

const validateSchemaPut = Joi.object({
  name: Joi.string().trim().min(2).max(30),
  email: Joi.string().email({ tlds: true }),
  phone: Joi.string().pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/),
});

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const getContactId = await getContactById(contactId);
  if (getContactId) {
    res.status(200).json({ status: 200, data: getContactId });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const result = validateSchemaPost.validate(body);
  const { error } = result;
  if (error) {
    const errorField = error.details.map((elem) => elem.message);
    res
      .status(400)
      .json({ message: `missing required name >>> ${errorField} <<<` });
  } else {
    const response = await addContact(body);
    res.status(201).json({ status: 201, data: response });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const isIdGet = await removeContact(contactId);
  if (isIdGet) {
    res.status(200).json({ status: 200, message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = validateSchemaPut.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { name, email, phone } = req.body;
  const { contactId } = req.params;
  if (!name && !email && !phone) {
    res.status(400).json({ message: "missing fields" });
  }
  const updatedContact = await updateContact(contactId, req.body);
  if (updatedContact) {
    res.status(200).json({ status: 200, data: updatedContact });
  } else {
    res.status(404).json({ status: 404, message: "Not found" });
  }
});

module.exports = router;
