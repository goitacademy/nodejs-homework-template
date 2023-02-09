const express = require("express");
const contacts = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const allBooks = await contacts.listContacts();
  res.json(allBooks);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const idContact = await contacts.getContactById(contactId);
  if (!idContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(idContact);
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
