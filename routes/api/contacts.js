const express = require("express");
const pls = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const response = await pls.listContacts();
  res.json(response);
});

router.get("/:contactId", async (req, res, next) => {
  const response = await pls.getContactById(req.params.contactId);
  res.json(response);
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  const response = await pls.removeContact(req.params.contactId);
  res.json(response);
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
