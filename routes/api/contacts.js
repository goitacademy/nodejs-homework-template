const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  phone: Joi.string().min(7).required(),
});

router.get("/", async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:id", async (req, res) => {
  const contact = await getById(req.params.id);

  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res) => {
  try {
    await contactSchema.validateAsync(req.body);
  } catch (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
});

router.delete("/:id", async (req, res) => {
  const result = await removeContact(req.params.id);

  if (result.message === "contact deleted") {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    await contactSchema.validateAsync(req.body);
  } catch (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  try {
    const updatedContact = await updateContact(req.params.id, req.body);
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
