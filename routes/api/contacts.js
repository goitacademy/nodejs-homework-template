const express = require("express");

const contacts = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message:
        "Server error :( Our work squirrels are doing their best to fix the issue...",
    });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);

    if (!result) {
      console.log("error");
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message:
        "Server error :( Our work squirrels are doing their best to fix the issue...",
    });
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:id", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:id", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
