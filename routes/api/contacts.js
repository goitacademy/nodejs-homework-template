const express = require("express");
const { nanoid } = require("nanoid");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

// ================================================= G E T all =======================================

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).json({ message: "Success", contacts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================================================= G E T by ID =======================================
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (contact) {
      res.status(200).json({
        message: "Success",
        contact,
      });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================================================= P O S T =======+++++================================
router.post("/", async (req, res, next) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ message: 'Missing required "name" field' });
    }
    if (!req.body.email) {
      res.status(400).json({ message: 'Missing required "email" field' });
    }
    if (!req.body.phone) {
      res.status(400).json({ message: 'Missing required "email" field' });
    }

    req.body.id = nanoid(21);
    const newContact = await addContact(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================================================= D E L E T E =======================================
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const currentContacts = await listContacts();

    const index = currentContacts.findIndex((item) => item.id === contactId);

    if (index === -1) {
      res.status(404).json({ message: "Not found" });
    } else {
      await removeContact(contactId);
      res.status(200).json({ message: "Contact deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================================================= P U T ============================================
router.put("/:contactId", async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: "Missing fields" });
    }
    if (!req.body.name) {
      res.status(400).json({ message: 'Missing required "name" field' });
    }
    if (!req.body.email) {
      res.status(400).json({ message: 'Missing required "email" field' });
    }
    if (!req.body.phone) {
      res.status(400).json({ message: 'Missing required "email" field' });
    }
    const { contactId } = req.params;

    const currentContacts = await listContacts();
    const index = currentContacts.findIndex((item) => item.id === contactId);

    if (index !== -1) {
      await updateContact(contactId, req.body);
      const updatedContact = await getContactById(contactId);
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
