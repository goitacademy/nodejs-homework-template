const express = require("express");
const contacts = require("../../models/contacts");
const router = express.Router();

const {
  addContactValidation,
  putContactValidation,
} = require("../../middlewares/validationMiddleware");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contacts.getContactById(contactId);
    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", addContactValidation, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = {
      id: new Date().getTime().toString(),
      name,
      email,
      phone,
    };
    await contacts.addContact(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const list = await contacts.listContacts();
    if (!list.find((it) => it.id === contactId)) {
      return res.status(404).json({ message: "Not found" });
    }
    await contacts.removeContact(contactId);
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", putContactValidation, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const list = await contacts.listContacts();
    if (!list.find((it) => it.id === contactId)) {
      return res.status(404).json({ message: "Not found" });
    }
    await contacts.updateContact(contactId, req.body);
    const data = await contacts.getContactById(contactId);
    res.json({ data });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
