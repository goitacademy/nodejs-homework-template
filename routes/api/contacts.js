const express = require("express");
const { v4: uuidv4 } = require("uuid");
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/contacts", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/contacts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getById(id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/contacts", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "missing required name field" });
    }
    const contact = { id: uuidv4(), name, email, phone };
    await addContact(contact);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/contacts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getById(id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    await removeContact(id);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/contacts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      return res.status(400).json({ message: "missing fields" });
    }
    const contact = await getById(id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    const updatedContact = await updateContact(id, req.body);
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
