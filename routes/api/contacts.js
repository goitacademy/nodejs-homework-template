const express = require("express");
const contacts = require("../../models/contacts");
const nodeId = require("node-id");
const createValidator = require("../../middlewares/joi/create.validator");
const updateValidator = require("../../middlewares/joi/update.validator");
const deepTrim = require("deep-trim");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await contacts.listContacts();
    res.status(200).json(contactsList);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;

    const contactById = await contacts.getContactById(contactId);

    if (!contactById) return res.status(404).json({ message: "Not found" });

    res.status(200).json(contactById);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", createValidator, async (req, res, next) => {
  try {
    const { name, email, phone } = await deepTrim(req.body);

    const body = {
      id: nodeId(),
      name,
      email,
      phone,
    };

    const newContact = await contacts.addContact(body);
    return res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;

    const deletedContact = await contacts.removeContact(contactId);

    if (!deletedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.put("/:contactId", updateValidator, async (req, res, next) => {
  try {
    const contactId = req.params.contactId;

    const { name, email, phone } = await deepTrim(req.body);

    const body = {
      name,
      email,
      phone,
    };

    const updatedContact = await contacts.updateContact(contactId, body);

    if (!updatedContact) return res.status(404).json({ message: "Not found" });

    if (updatedContact) return res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
