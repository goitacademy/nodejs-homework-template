const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("..");
const Joi = require("joi");

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().pattern(
    /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
    "numbers"
  ),
});

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).send(contacts);
});

router.get("/:id", async (req, res, next) => {
  const contact = await getContactById(req.params.id);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(contact);
});

router.post("/", async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json(error.message);
    return;
  }
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ message: "Missing required name field" });
    return;
  }
  const contact = await addContact(req.body);
  res.status(201).json(contact);
});

router.delete("/:id", async (req, res, next) => {
  const contact = await removeContact(req.params.id);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({ message: "Contact deleted" });
});

router.put("/:id", async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json(error.message);
    return;
  }
  if (!req.body) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }
  const contact = await updateContact(req.params.id, req.body);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(contact);
});

module.exports = router;
