const express = require("express");

const router = express.Router();

// ROUTS

router.get("/", async (req, res, next) => {
  res.json({ message: "template message" });
  next();
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
  next();
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
  next();
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
  next();
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
  next();
});

module.exports = { router, contactPath };
