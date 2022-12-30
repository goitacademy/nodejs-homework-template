const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");
const {
  getContacts,
  getContact,
} = require("../../controllers/contacts.controllers");
const router = express.Router();

router.get("/", tryCatchWrapper(getContacts));

router.get("/:contactId", tryCatchWrapper(getContact));

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
