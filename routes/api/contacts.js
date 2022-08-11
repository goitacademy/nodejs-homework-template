const express = require("express");
const Joi = require("joi");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.status(200).json({
    status: "success",
    data,
  });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = await getContactById(id);
  if (data.message) {
    res.status(404).json(data);
    return;
  }
  res.status(200).json(data);
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = await req.body;
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string().min(3).max(30).required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    console.log(validationResult.error);
    return res.status(400).json({ message: "missing required name field" });
  }
  const newContact = await addContact(name, email, phone);
  res.status(201).json({ ...newContact });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = await removeContact(id);
  if (data.message) {
    res.status(404).json(data);
    return;
  }
  res.status(200).json(data);
});

router.put("/:id", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string().min(3).max(30),
  });
  const { name, email, phone } = await req.body;
  const validationResult = schema.validate(req.body);
  if (validationResult.error || (!name && !email && !phone)) {
    return res.status(400).json({ message: "missing fields" });
  }
  const { id } = req.params;
  const data = await updateContact(id, req.body);
  if (data.message) {
    res.status(404).json(data);
  }
  res.status(200).json(data);
});

module.exports = router;
