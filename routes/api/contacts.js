const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ message: "Home work 02" });
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "Home work 02" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "Home work 02" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "Home work 02" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "Home work 02" });
});

module.exports = router;
