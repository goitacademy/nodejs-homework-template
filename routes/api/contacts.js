const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts.json");

router.get("/", async (req, res, next) => {
  res.json(contacts);
  // res.json({ message: "template message" });
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
