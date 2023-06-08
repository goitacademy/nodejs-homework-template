const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  contactFavorite,
} = require("../../models/contacts");

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().max(20).required(),
  email: Joi.string().email().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(3),
  phone: Joi.string().min(9),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
}).or("name", "phone", "email", "password");

const router = express.Router();

router.get("/", async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res) => {
  const contacts = await getContactById(req.params.contactId);
  if (contacts) {
    res.status(200).json(contacts);
  } else {
    res.status(404).json({ message: "Not found" });
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

router.delete("/:contactId", async (req, res) => {
  const deleteContact = await removeContact(req.params.contactId);
  if (deleteContact) {
    res.status(200).json({ message: "Contact Deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res) => {
  try {
    const { error } = updateSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }
    const updateContacts = await updateContact(req.params.contactId, req.body);
    if (updateContacts) {
      res.status(200).json(updateContacts);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:contactId/favorite", async (req, res) => {
  const favorite = req.body;
  if (favorite === undefined) {
    res.status(400).json({ message: "missing field favorite" });
    return;
  }
  const updateContact = await contactFavorite(req.params.contactId, favorite);
  if (!updateContact) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json(updateContact);
  }
});

module.exports = router;
