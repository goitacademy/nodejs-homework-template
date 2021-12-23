const express = require("express");
const router = express.Router();
const { listContacts } = require("../../model/index");

router.get("/", async (req, res, next) => {
  const result = await listContacts();

  res.json({
    status: "success",
    code: 200,
    data: result,
    message: "get",
  });
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

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
