const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();
const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().min(5).max(30).required(),
  phone: Joi.number().integer().required(),
});
const updateSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().min(5).max(30),
  phone: Joi.number().integer(),
});
router.get("/contacts", async (req, res, next) => {
  const contactsList = await listContacts();

  res.json({ status: "succes", code: 200, contactsList });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact.length === 0) {
    return res.status(404).json({ message: "not found" });
  } else {
    res.json({ status: "succes", code: 200, contact });
  }
});

router.post("/contacts", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({ message: result.error.message });
  } else {
    const contact = await addContact({ name, email, phone });
    res.status(201).json({ contact });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const remove = await removeContact(contactId);
  if (remove.length === 0) {
    return res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json({ message: "contact deleted" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const { error } = updateSchema.validate(req.body);
  const updateResult = await updateContact(contactId, req.body);
  if (error) {
    res.status(400).json({ message: error.message });
  } else if (!updateResult) {
    res.status(404).json({ message: "contact not found" });
  } else {
    res.status(200).json({ updateResult });
  }
});

module.exports = router;
