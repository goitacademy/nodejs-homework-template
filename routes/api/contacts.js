const express = require("express");
const Joi = require("Joi");
const pattern = "^[0-9]{7,13}$";

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
  phone: Joi.string().pattern(new RegExp(pattern)).required(),
});
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contactsList = await listContacts();
  res.json({ message: contactsList });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contactById = await getContactById(id);
  if (contactById === null) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: contactById });
});

router.post("/", async (req, res, next) => {
  const { body } = req;
  const { name, email, phone } = body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error });
  }

  const contactAdd = await addContact(body);
  res.status(201).json({ message: contactAdd });
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contactRemovedById = await removeContact(id);
  if (contactRemovedById === null) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const {
    body,
    params: { contactId },
  } = req;
  const { name, email, phone } = body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing fields" });
  }
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error });
  }
  const contactUpdated = await updateContact(contactId, body);
  if (contactUpdated === null) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: contactUpdated });
});

module.exports = router;
