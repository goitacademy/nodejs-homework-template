const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const joi = require("joi");
const schema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const { error } = schema.validate(body);
    if (error) {
      const fieldName = error.details[0].context.label;
      return res
        .status(400)
        .json({ message: `Missing required ${fieldName} field` });
    }
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const removedContact = await removeContact(contactId);

    if (!removedContact) {
      res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ message: `Contact ${removedContact.name} deleted` });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const { error } = schema.validate(body);
    if (error) {
      const fieldName = error.details[0].context.label;
      return res
        .status(400)
        .json({ message: `Missing required ${fieldName} field` });
    }
    const updatedContact = await updateContact(contactId, body);

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
