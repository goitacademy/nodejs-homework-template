const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  const result = await contacts.getContactById(req);
  res.json(result);
});

router.post("/", async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
});

router.put("/:contactId", async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
});

module.exports = router;
