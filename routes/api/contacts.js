const express = require("express");
const { asyncMiddlewareWrapper } = require("@root/helpers");
const contactsActions = require("@root/controllers");

const router = express.Router();

router.get("/", asyncMiddlewareWrapper(contactsActions.getAllContacts));

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
