const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.normalize("db/contacts.json");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  res.json({
    status: "success",
    code: 200,
    data,
  });
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message for contactsById" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message POST Contacts" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message DELETE Contacts" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message EDIT Contacts" });
});

module.exports = router;
