const express = require("express");
const router = express.Router();

const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 6);

const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  return res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    return res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(60).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    console.log(validationResult.error);
    return res.status(400).json({
      message: validationResult.error.details,
    });
  }

  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: `missing required name field`,
    });
  }

  const id = nanoid();
  const newContact = {
    id,
    name,
    email,
    phone,
  };

  const resultSendNewContact = await addContact(newContact);

  return res.status(201).json(resultSendNewContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const resultRemoveContact = await removeContact(contactId);

  if (resultRemoveContact) {
    return res.status(200).json({ message: "contact deleted" });
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(60),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    console.log(validationResult.error);
    return res.status(400).json({
      message: validationResult.error.details,
    });
  }

  if (!req.body) {
    return res.status(400).json({ message: "missing fields" });
  }

  // const { name, email, phone } = req.body;
  const { contactId } = req.params;
  const resultUpdateContact = await updateContact(contactId, req.body);

  if (!resultUpdateContact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(resultUpdateContact);
});

module.exports = router;
