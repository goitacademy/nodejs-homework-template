const express = require("express");
const shortid = require("shortid");

const router = express.Router();

let contacts = require("../../models/contacts.json");

router.get("/", async (req, res, next) => {
  res.status(200).json({ contacts, message: "success" });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const [contact] = contacts.filter((item) => item.id === contactId);

  if (!contact) {
    return res.status(400).json({ message: "Not found" });
  }
  res.json({ contact, message: "success" });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  contacts.push({
    id: shortid.generate(),
    name,
    email,
    phone,
  });
  res.json({ message: "success" });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  contacts = contacts.filter((item) => item.id !== contactId);

  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
