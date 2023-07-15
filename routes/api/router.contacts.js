const express = require("express");
const Joi = require("joi");

const router = express.Router();
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const schema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.number(),
});

router.get("/", async (req, res, next) => {
  const allContacts = await listContacts();
  console.log(allContacts);
  res.json(allContacts);
});

router.get("/:id", async (req, res, next) => {
  const data = await getById(req.params.id);
  if (!data) {
    next();
  } else res.json(data);
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  console.log(req.body);
  console.log(name, email, phone);
  if (name && email && phone) {
    const response = await addContact(schema.validate(req.body));
    console.log(response);
    res.status(201).json(response);
  } else res.status(400).json({ message: "missing required name field" });
});

router.delete("/:id", async (req, res, next) => {
  const deletedContact = await removeContact(req.params.id);
  if (deletedContact) {
    res.status(200).json({ message: "contact deleted" });
  } else res.status(404).json({ message: "Not found" });
});

router.put("/:id", async (req, res, next) => {
  const updatedContact = await updateContact(
    req.params.id,
    schema.validate(req.body)
  );
  // const { name, phone, email } = req.body;
  console.log(Object.keys(req.body).length);
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else res.status(404).json({ message: "Not found" });
});

module.exports = router;
