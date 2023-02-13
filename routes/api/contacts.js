const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts.json");

router.get("/", async (req, res, next) => {
  // await res.json({
  //   status: "success",
  //   code: 200,
  //   data: {
  //     result: contacts,
  //   },
  // });
});

router.get("/:contactId", async (req, res, next) => {
  // const { contactId } = req.params;
  // const result
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
