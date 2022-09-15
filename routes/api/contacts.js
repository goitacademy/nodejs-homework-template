const express = require("express");

const router = express.Router();
const { listContacts } = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const list = await listContacts();
    res.json({ message: "contacts list", list: JSON.parse(`${list}`) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
