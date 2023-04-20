const express = require("express");
const Joi = require("joi");
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).or("name", "email", "phone");

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.status(200).json(data);
});

router.get("/:contactId", async (req, res, next) => {
  const data = await getContactById(req.params.contactId);
  if (!data) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(data);
});

router.post("/", async (req, res, next) => {
  const { error } = createSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const data = await addContact(req.body);
  res.status(201).json(data);
});

router.delete("/:contactId", async (req, res, next) => {
  const data = await removeContact(req.params.contactId);
  if (!data) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const { error } = updateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "incorrectly filled data" });
  }

  const result = await updateContact(req.params.contactId, req.body);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status("200").json(result);
});

module.exports = router;
