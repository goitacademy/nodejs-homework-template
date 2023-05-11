const express = require("express");

const contacts = require("../../models/db/");
const router = express.Router();

router.get("./books.js", async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
});

module.exports = router;
