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

const schemeAddContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(50).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});

const schemeUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(50),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ result: contacts });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    res.status(200).json({ result: contact });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/", async (req, res, next) => {
  const { body } = req;
  const validateData = schemeAddContact.validate(body);
  if (validateData.error) {
    res.status(400).json({ message: validateData.error.details[0].message });
    return;
  }
  try {
    const contact = await addContact(body);
    if (!contact) {
      res.status(404).json({ message: "Something went wrong try again" });
      return;
    }
    res.status(201).json({ result: contact });
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await removeContact(contactId);

    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { params, body } = req;
  const validateData = schemeUpdateContact.validate(body);
  if (validateData.error) {
    res.status(400).json({ message: validateData.error.details[0].message });
    return;
  }
  try {
    const contact = await updateContact(params.contactId, body);
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "contact changed successfully", result: contact });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
