const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ message: "home-work" });
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "home-work" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "home-work" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "home-work" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "home-work" });
});

module.exports = router;
