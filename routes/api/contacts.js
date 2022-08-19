const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();
const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.string()
    .length(11)
    .pattern(/^\d{1}-\d{3}-\d{2}-\d{2}$/)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

router.get("/", async (req, res) => {
  const data = await listContacts();

  res.json(data);
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;

  const dataId = await getContactById(contactId);

  if (!dataId.length) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(dataId);
});

router.post("/", async (req, res) => {
  try {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    const contact = await addContact(validationResult.value);
    return res.status(201).send(contact);
  } catch (error) {
    res
      .status(400)
      .json({ message: `missing required ${error.message} field` });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  if (contactId) {
    await removeContact(contactId);
    res.status(200).send({ message: "contact deleted" });
  } else {
    res.status(404).send({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = schema.validate(req.body);
  if (!data) {
    res.status(400).json({ message: "missing fields" });
  } else if (data) {
    const contact = await updateContact(contactId, data.value);
    res.status(200).send(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
