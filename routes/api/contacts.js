const express = require("express");
const contacts = require("../../models/contacts.js");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (error) {
    res.statusCode(500, error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.getContactById(id);
    if (!contact) {
      const error = new Error();
      error.status = 404;
      error.message = "Not Found";
      throw error;
    }
    res.json(contact);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  const contact = await contacts.addContact(name, email, phone);
  res.status(201).json(contact);
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
