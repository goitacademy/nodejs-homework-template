const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const router = express.Router();

const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).send({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await getContactById(contactId);

  if (contact) {
    res.status(200).send({ contact });
  } else {
    res.status(404).send({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const validationResults = schema.validate(req.body);
  if (validationResults.error) {
    res.status(400).json({ message: "missing required name - field" });
  } else {
    await addContact(req.body);
    res
      .status(201)
      .json({ message: `${req.body.name} has been added to contacts` });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const isContactDeleted = await removeContact(req.params.contactId);

  if (isContactDeleted) {
    res.status(200).json({ message: `Contact has been deleted` });
  } else {
    res.status(404).json({ message: "Contact doens't exist" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  validationResults = schema.validate(req.body);
  if (validationResults.error) {
    res.status(400).json({ message: "missing fields" });
  } else {
    const contact = await updateContact(req.params.contactId, req.body);
    if (contact) {
      res
        .status(200)
        .send({ message: `Contact ${req.body.name} has been updated` });
    } else {
      res.status(400).send({ message: "Not found" });
    }
  }
});

module.exports = router;
