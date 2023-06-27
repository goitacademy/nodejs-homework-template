const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // res.json({ message: "template message - home work-2" });
  res.json("<h2>Home page</h2>");
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
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
