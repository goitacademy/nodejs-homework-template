const express = require("express");
const models = require("../../models/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ message: "template message for GET" });
  models.listContacts();
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message for GET/:contactId" });
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
