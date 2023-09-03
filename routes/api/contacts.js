const express = require("express");
const Joi = require("joi");

const router = express.Router();

const contactsModel = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsModel.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await contactsModel.getContactById(contactId);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const { error } = validateContact(req.body);

  if (error) {
    return res.status(400).json({
      message: `Missing required ${error.details[0].context.key} field`,
    });
  }

  const newContact = await contactsModel.addContact(req.body);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const isRemoved = await contactsModel.removeContact(contactId);

  if (isRemoved) {
    res.json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const { error } = validateContact(req.body);

  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const updatedContact = await contactsModel.updateContact(contactId, req.body);

  if (updatedContact) {
    res.json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

const validateContact = (contact) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  return schema.validate(contact);
};

module.exports = router;
