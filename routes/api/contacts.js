const express = require("express");
const contacts = require("../../models/contacts.js");

const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");

const newContactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

const updatedContactSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
});

router.get("/", async (_, res) => {
  contacts
    .listContacts()
    .then((jsonList) => res.status(200).json(jsonList))
    .catch((error) => res.status(418).json({ error }));
});

router.get("/:contactId", async (req, res) => {
  const id = req.params.contactId;
  contacts
    .getContactById(id)
    .then((searchedContact) => res.status(200).json(searchedContact))
    .catch((error) => res.status(418).json(error));
});

router.post("/", async (req, res) => {
  const { error, contact } = newContactSchema.validate(req.body);
  if (_.isEmpty(req.body)) {
    res.status(400).json({ message: "missing request body" });
    return;
  }
  if (error !== undefined) {
    res.status(400).json({ message: "missing properties" });
    return;
  }
  const { name, email, phone } = contact;
  const propertiesObject = { name, email, phone };
  const missingProperties = Object.keys(propertiesObject).filter(
    (key) => propertiesObject[key] === undefined
  );
  if (missingProperties.length > 0) {
    res.status(400).json({
      message: `missing required properties: ${missingProperties.join(", ")}`,
    });
    return;
  }
  contacts
    .addContact(contact)
    .then((newContact) => res.status(201).json({ newContact }));
});

router.delete("/:contactId", async (req, res) => {
  const id = req.params.contactId;
  contacts
    .removeContact(id)
    .then(() =>
      res.status(200).json({ message: `contact with id ${id} deleted` })
    )
    .catch((error) => res.status(404).json(error));
});

router.put("/:contactId", async (req, res) => {
  const id = req.params.contactId;
  if (_.isEmpty(req.body)) {
    res.status(400).json({ message: "missing request body" });
    return;
  }
  const { error, contact } = updatedContactSchema.validate(req.body);
  if (error !== undefined) {
    res.status(400).json({ message: "missing properties" });
    return;
  }
  contacts
    .updateContact(id, contact)
    .then((updatedContact) => {
      res.status(200).json({ updatedContact });
    })
    .catch((error) => {
      switch (error.code) {
        case contacts.ERROR_CODES.NOT_FOUND:
          res.status(404).json(error.message);
          break;
        case contacts.ERROR_CODES.MISSING_FIELDS:
        case contacts.ERROR_CODES.INVALID_PROPERTIES:
          res.status(400).json(error.message);
          break;
        default:
          res.status(400).json(error);
      }
    });
});

module.exports = router;
