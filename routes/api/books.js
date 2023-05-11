const express = require("express");

const indexContacts = require("../../models/index");
const contacts = require("../../models/contacts.json");
const router = express.Router();

router.get("./books.js", async (req, res) => {
  const result = await indexContacts.listContacts();
  res.json(result);
});

module.exports = router;
