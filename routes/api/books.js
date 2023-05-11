const express = require("express");
const contacts = require("../../models/contacts.js");
const router = express.Router();

// HTTP ERROR
const HttpError = require("../../helper/HttpError.js");

// Full listContacts
router.get("/", async (req, res) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(error).json({ message: "Server error" });
  }
});

// contact ById
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    res.status(error).json({ message: "id error" });
  }
});
module.exports = router;
