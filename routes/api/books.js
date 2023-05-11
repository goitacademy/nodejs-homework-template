const express = require("express");
const contacts = require("../../models/contacts.js");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
});

module.exports = router;
