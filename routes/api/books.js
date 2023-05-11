const express = require("express");
const contacts = require("../../models/contacts.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(error).json({ message: "Server error" });
  }
});

module.exports = router;
