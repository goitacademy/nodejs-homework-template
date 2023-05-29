const express = require("express");

const router = express.Router();

const operations = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const result = await operations.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "not found",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await operations.getContactById(contactId);
    if (!contactById) {
      const error = new Error("not found");
      error.statusCode = 404;
      throw error;
    }
    res.json(contactById);
  } catch (error) {
    res.status(500).json({
      message: "not found",
    });
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await operations.removeContact(contactId);
    res.json({ message: "contact deleted" });
  } catch (error) {}
  // res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
