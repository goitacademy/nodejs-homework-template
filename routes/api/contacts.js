const express = require("express");
const router = express.Router();
const { listContacts } = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message 2" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message 3" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message 4" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message 5" });
});

router.get("/new", async (req, res, next) => {
  res.json({ message: "new" });
});

module.exports = router;
