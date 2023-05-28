const express = require("express");

const router = express.Router();

const operations = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const result = await operations.listContacts();
  console.log("🚀 ~ operations.listContacts():", operations.listContacts());

  res.json(result);
  // res.json(operations.listContacts());
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
