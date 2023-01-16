const express = require("express");
const router = express.Router();
const {
  listContacts,
  // getContactById,
  // addContact,
  // updateContact,
  // removeContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).json({ contacts });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message id" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message post" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message delete" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message put" });
});

module.exports = router;
