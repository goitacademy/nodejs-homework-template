const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactFavorite,
} = require("../../models/contacts.js");
const authenticateToken = require("../../token.middleware.js");

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  phone: Joi.string().min(7),
}).or("name", "email", "phone");

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const favorite = req.query.favorite;

  const filter = favorite ? { favorite: favorite === "true" } : {};

  const contacts = await listContacts(filter, page, limit);
  res.status(200).json(contacts);
});

router.get("/:id", async (req, res) => {
  const contact = await getContactById(req.params.id);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json(contact);
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const removed = await removeContact(req.params.id);
  if (!removed) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json({ message: "contact deleted" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }
    const updatedContact = await updateContact(req.params.id, req.body);
    if (!updatedContact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json(updatedContact);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:contactId/favorite", async (req, res) => {
  const { favorite } = req.body;
  if (favorite === undefined || typeof favorite !== "boolean") {
    res.status(400).json({ message: "favorite field is missing or invalid" });
    return;
  }
  const updatedContact = await updateContactFavorite(
    req.params.contactId,
    favorite
  );
  if (!updatedContact) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json(updatedContact);
  }
});
router.get("/", authenticateToken, async (req, res) => {
  // ...
});

router.get("/:id", authenticateToken, async (req, res) => {
  // ...
});

module.exports = router;