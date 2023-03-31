const express = require("express");

const contacts = require("../../models/contacts.json");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  res.json(contacts[0]);
});

router.post("/", async (req, res, next) => {
  res.json(contacts[0]);
});

router.delete("/:contactId", async (req, res, next) => {
  res.json(contacts[0]);
});

router.put("/:contactId", async (req, res, next) => {
  res.json(contacts[0]);
});

module.exports = router;
