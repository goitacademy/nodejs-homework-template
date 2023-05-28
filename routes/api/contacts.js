const express = require("express");

const router = express.Router();

const operations = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const result = await operations.listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await operations.getContactById(contactId);
  if (!contactById) {
    res.status(404).json({ message: "Not found" });
  }
  res.json(contactById);
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
