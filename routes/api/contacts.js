const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

const Joi = require("joi");

const contactValidatePost = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const contactValidatePut = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contacts = await getContactById(contactId);
  if (contacts.length !== 0) {
    res.json(contacts);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const { error } = contactValidatePost.validate(body);

  if (body.name && body.email && body.phone && !error) {
    const contact = await addContact(body);
    res.status(201).json(contact);
  } else {
    let missingField;
    if (!body.name) {
      missingField = "name";
    } else if (!body.email) {
      missingField = "email";
    } else if (!body.phone) {
      missingField = "phone";
    }
    res.status(400).json({
      message: `Missing required ${missingField} field.`,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const response = await removeContact(contactId);

  if (response) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const body = req.body;
  console.log(body);
  const { contactId } = req.params;
  const { error } = contactValidatePut.validate(body);
  if (!body.name || !body.email) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const responce = await updateContact(contactId, body);
  if (responce && !error) {
    res.status(200).json(responce);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
