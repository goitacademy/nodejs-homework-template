const express = require("express");
const router = express.Router();
const listContacts = require("../../model/contacts.json");
router.get("/", async (req, res, next) => {
  res.json(listContacts);
});

router.get("/:contactId", async (req, res, next) => {
  res.status(200).json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
