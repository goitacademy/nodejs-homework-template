const express = require("express");

const router = express.Router();

const contactsOperations = require("../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.getAll();
    res.json({ status: "success", code: 200, data: { result: contacts } });
  } catch (err) {}
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getById(contactId);
    if (!contact) {
      res.json({ message: "not found" });
      return;
    }
    res.json({ status: "success", code: 200, data: { result: contact } });
  } catch (err) {}
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
