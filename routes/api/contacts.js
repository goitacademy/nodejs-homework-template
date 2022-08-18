const express = require("express");
const joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();
const postBodySchema = joi.object({
  name: joi.string().required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  phone: joi.string().required(),
});

const updateBodySchema = joi.object({
  name: joi.string(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } }),
  phone: joi.string(),
});

router.get("/", async (req, res) => {
  res.json(await listContacts());
});

router.get("/:contactId", async (req, res) => {
  res.json(await getContactById(req.params.contactId));
});

router.post("/", async (req, res) => {
  const validBody = await postBodySchema.validate(req.body);
  if (validBody.error) {
    return res.status(400).json({ message: "Missing required name field" });
  }
  res.json(await addContact(validBody.value));
});

router.delete("/:contactId", async (req, res) => {
  const code = await removeContact(req.params.contactId);
  if (code === 404) {
    return res.status(code).json({ message: "Not found" });
  }
  res.json({ message: "Contact deleted" });
});

router.put("/:contactId", async (req, res) => {
  const validBody = await updateBodySchema.validate(req.body);
  if (validBody.error || Object.keys(validBody.value).length === 0) {
    return res.status(400).json({ message: "Missing required name field" });
  }
  const newContact = await updateContact(req.params.contactId, validBody.value);
  if (!newContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(newContact);
});

module.exports = router;
