const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const {
  addValidation,
  updateValidation,
} = require("../middlewares/validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).send(error.message);
    next();
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
    next();
  }
});

router.post("/", addValidation, async (req, res, next) => {
  try {
    const contacts = await addContact(req.body);
    if (contacts.length) {
      res.status(201).json(contacts);
    } else {
      res.status(500).send("Write error");
    }
  } catch (error) {
    res.status(500).send(error.message);
    next();
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contacts = await removeContact(req.params.contactId);
    if (contacts) {
      res.status(200).json(contacts);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
    next();
  }
});

router.put("/:contactId", updateValidation, async (req, res, next) => {
  try {
    const contacts = await updateContact(req.params.contactId, req.body);
    if (contacts) {
      res.status(200).json(contacts);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
    next();
  }
});

module.exports = router;
