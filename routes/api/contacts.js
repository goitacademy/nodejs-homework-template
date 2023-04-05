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
  if (error) {
    res.status(400).json({
      message: error.details[0].message,
    });
  }
  if (body.name && body.email && body.phone) {
    const contact = await addContact(body);
    res.status(201).json(contact);
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
  const { contactId } = req.params;
  const { error } = contactValidatePut.validate(body);
  if (error) {
    res.status(400).json({
      message: error.details[0].message,
    });
  } else {
    const responce = await updateContact(contactId, body);
    if (responce) {
      res.status(200).json(responce);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  }
});

module.exports = router;
