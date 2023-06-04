const express = require("express");
const Joi = require("joi").extend(require("joi-phone-number"));
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().phoneNumber().required(),
});

const router = express.Router();

// Get contacts - works
router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ message: contacts });
});

// Get contacts with id - works
router.get("/:contactId", async (req, res, next) => {
  try {
    const foundContact = await getContactById(req.params.contactId);
    if (foundContact) {
      res.status(200).json(foundContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// Add contact- works
router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      const add = await addContact(req.body);

      res.status(201).json({ message: add });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Delete contact- works
router.delete("/:contactId", async (req, res, next) => {
  try {
    const response = await removeContact(req.params.contactId);
    if (response) {
      res.json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// Update contact- works
router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      const updatedContact = await updateContact(
        req.params.contactId,
        req.body
      );

      if (updatedContact) {
        return res.status(200).json({ message: updatedContact });
      } else {
        return res.status(404).json({ message: "Not found" });
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
