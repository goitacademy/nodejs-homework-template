const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ message: "Home work" });
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "Home work" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "Home work" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "Home work" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "Home work" });
});

module.exports = router;
