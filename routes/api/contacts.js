const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200).json({ data });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const data = await getContactById(contactId);
    if (data === undefined) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json({ data });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "missing required name field" });
      return;
    }
    const data = await addContact(req.body);
    res.status(201).json({ data });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const data = await getContactById(contactId);
    if (!data) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    await removeContact(contactId);

    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "missing required name field" });
      return;
    }

    const contactId = req.params.contactId;

    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json({ updatedContact });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
