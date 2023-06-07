const express = require("express");

const { getAllContacts, getContact, add } = require("../../controllers");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContact);

router.post("/", add);

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
