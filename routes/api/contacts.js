const express = require("express");
const models = require("../../models/contacts");
console.log(models);

const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log("get all contacts", req);
  res.status(210).json({ message: "get all contacts" });
});

router.get("/:contactId", async (req, res, next) => {
  console.log("get contacts by id", req);
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
