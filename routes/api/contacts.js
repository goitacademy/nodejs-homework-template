const express = require("express");

const contactsService = require("../../models/contacts");

const router = express.Router();

const { HttpError } = require("../../helpers");

router.get("/", async (req, res) => {
  try {
    const results = await contactsService.listContacts();
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const result = await contactsService.getContactById(req.params.contactId);
    console.log(`results222`, result);
    if (!result) {
      throw HttpError(404, `Movie with ${req.params.contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
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
