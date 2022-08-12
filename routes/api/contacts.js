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
} = require("../../middlewares/validation");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ contacts });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (contact.length === 0) {
      res
        .status(404)
        .json({ message: `Contact with id:${contactId} does not exist` });
      return;
    }
    res.status(200).json({ contact });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", addContactValidation, async (req, res) => {
  try {
    const contact = await addContact(req.body);
    res.status(201).json({ contact });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.delete("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (contact.length === 0) {
      res
        .status(404)
        .json({ message: `Contact with id:${contactId} does not exist` });
      return;
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", putContactValidation, async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await updateContact(contactId, req.body);
    if (contact.length === 0) {
      res
        .status(404)
        .json({ message: `Contact with id:${contactId} does not exist` });
      return;
    }
    res.status(200).json({ contact });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
