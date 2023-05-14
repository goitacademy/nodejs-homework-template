const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./../../models/contacts");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string().min(9).max(20).required(),
  favorite: Joi.boolean(),
});

router.get("/", async (req, res, next) => {
  const contactList = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contactList,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const requestedContact = await getContactById(contactId);
  if (!requestedContact) return res.status(404).json({ message: "Not found" });
  res.json({
    status: "success",
    code: 200,
    data: {
      requestedContact,
    },
  });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = contactSchema.validate({ name, email, phone });
  if (error) return res.status(400).json({ message: "missing required field" });
  const newContact = await addContact({ name, email, phone });
  res.json({
    status: "success",
    code: 201,
    data: { newContact },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const deletedContact = await removeContact(contactId);
  if (!deletedContact) return res.status(404).json({ message: "Not found" });
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contactId = req.params.contactId;
  const { error } = contactSchema.validate({ name, email, phone });
  if (error) return res.status(400).json({ message: "missing required field" });
  const updatedContact = await updateContact(contactId, { name, email, phone });
  if (!updatedContact) return res.status(404).json({ message: "Not found" });
  res.json({
    status: "success",
    code: 200,
    data: {
      updatedContact,
    },
  });
});

module.exports = router;
