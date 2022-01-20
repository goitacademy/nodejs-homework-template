const express = require("express");
const contacts = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (e) {
    console.log(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await contacts.getContactById(req.params);
    res.json(contact);
  } catch (e) {
    console.log(e);
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
