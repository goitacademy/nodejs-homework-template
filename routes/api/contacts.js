const express = require("express");
const Joi = require("joi");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const contact = require("../../models/contactModel");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contactFunctions");

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = createContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    await removeContact(contactId);
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const { error } = updateContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, phone } = req.body;

  try {
    const updatedContact = await updateContact(contactId, req.body);
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

router.get("/contacts", authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const countDocuments = await contact.countDocuments().exec();

    if (endIndex < countDocuments) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = await contact.find().limit(limit).skip(startIndex).exec();

    res.status(200).json(results);
  } catch (error) {
    console.error("Error in /contacts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/contacts", authMiddleware, async (req, res) => {
  try {
    const favorite = req.query.favorite;

    let filteredContacts;

    if (favorite === "true") {
      filteredContacts = await contact.find({ favorite: true }).exec();
    } else {
      filteredContacts = await contact.find().exec();
    }

    res.status(200).json(filteredContacts);
  } catch (error) {
    console.error("Error in /contacts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
