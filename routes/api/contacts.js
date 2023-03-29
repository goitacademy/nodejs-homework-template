const express = require("express");
const contacts = require("../../models/contacts");
// const listContacts = require("../../models/contacts");

const router = express.Router();

// router.get("/", contacts.listContacts);

router.get("/", async (req, res, next) => {
  // const allContacts = contacts.listContacts();
  // res.json(allContacts);
  const result = await contacts.listContacts();
  res.json(result);
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
