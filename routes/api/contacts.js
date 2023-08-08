const express = require("express");
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const allContacts = await listContacts();
  res.json(allContacts);
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
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
