const express = require("express");
const contacts = require("../../models/contacts");

const nodeId = require("node-id");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await contacts.listContacts();
    res.json(contactsList);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;

  try {
    const contactById = await contacts.getContactById(contactId);

    if (!contactById) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(contactById);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = await req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: `missing required ${name} field` });
    }

    if (!email) {
      return res
        .status(400)
        .json({ message: `missing required ${email} field` });
    }

    if (!phone) {
      return res
        .status(400)
        .json({ message: `missing required ${phone} field` });
    }

    const body = {
      id: nodeId(),
      name,
      email,
      phone,
    };

    const contact = await contacts.addContact(body);
    return res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
