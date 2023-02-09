const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts.json");

router.get("/", async (req, res, next) => {
  res.json({ contacts, message: "success" });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const [contact] = contacts.filter((item) => item.id === contactId);

  if (!contact) {
    return res
      .status(400)
      .json({ status: `failure, we don't have contact with id: ${contactId}` });
  }
  res.json({ contact, message: "success" });
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
