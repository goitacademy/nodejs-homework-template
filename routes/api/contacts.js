const express = require("express");
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../models/contacts");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    console.error("Error reading contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:contactId", async (req, res) => {
  const contactId = req.params.contactId;

  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
    } else {
      res.json(contact);
    }
  } catch (error) {
    console.error("Error getting contact by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res, next) => {
  const body = req.body;

  const validation = contactSchema.validate(body);

  if (validation.error) {
    res.status(400).json({ error: validation.error.details[0].message });
  } else {
    try {
      const contacts = await addContact(body);
      res.json(body);
    } catch (error) {
      console.error("Error reading contacts:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  console.log("Contact ID:", contactId);

  try {
    const removedContact = await removeContact(contactId);

    if (!removedContact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json({ mensaje: "Contacto eliminado" });
    }
  } catch (error) {
    console.error("Error removing contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;

  const validation = contactSchema.validate(body);

  if (validation.error) {
    res.status(400).json({ error: validation.error.details[0].message });
  } else {
    try {
      const updatedContact = await updateContact(contactId, body);

      if (!updatedContact) {
        res.status(404).json({ message: "Not found" });
      } else {
        res.status(200).json(updatedContact);
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

module.exports = router;