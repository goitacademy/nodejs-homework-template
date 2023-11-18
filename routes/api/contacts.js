const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ message: " message" });
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: " message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: " message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: " message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: " message" });
});

module.exports = router;
