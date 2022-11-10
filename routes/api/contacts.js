const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  addContactValidation,
  putContactValidation,
} = require("../../middlewares/validationMiddlevare");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ message: "success", code: 200, contacts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json({ message: "success", contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", addContactValidation, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "missing required name field" });
      return;
    }
    const contact = await addContact(name, email, phone);
    res.status(201).json({ message: "contact added", contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const contactDeleted = await removeContact(contactId);
    if (!contactDeleted) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:contactId", putContactValidation, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);
    if (Object.keys(req.body).length === 0) {
      req.status(400).json({ message: "missing fields" });
      return;
    }

    if (!updateContact) {
      res.status(400).json({ message: "Not found" });
    }

    res
      .status(200)
      .json({ message: "contact updated", contact: updatedContact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
