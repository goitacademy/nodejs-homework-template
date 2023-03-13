const express = require("express");

const { listContacts } = require("../controllers/contacts");
const { contactSchema } = require("../models/contacts");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const contacts = listContacts();
    res.status(200).json(contacts);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "helno world" });
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
