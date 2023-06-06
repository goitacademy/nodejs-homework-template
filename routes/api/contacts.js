const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const {
  newContactSchema,
  updateContactSchema,
} = require("../../models/contactSchema");

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(id);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json(contact);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = newContactSchema.validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const newContact = await addContact(req.body);
      res.status(201).json(newContact);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const removedContact = await removeContact(id);

    if (removedContact) {
      res.status(200).json({ message: `Contact deleted` });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const { id } = req.params;
      const body = req.body;
      const updated = await updateContact(id, body);

      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
