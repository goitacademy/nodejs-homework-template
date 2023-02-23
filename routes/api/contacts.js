const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

const HttpError = require("../../helpers");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    return res.json(result);
  } catch (error) {
    res.status(500).json({ massage: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(contactId);
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    return res.json(result);
  } catch (error) {
    res.status(500).json({ massage: "Server error" });
  }
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
