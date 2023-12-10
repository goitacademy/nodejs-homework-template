const express = require("express");
const models = require("../../models/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await models.listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const ID = req.params.contactId;
  // console.log(ID);
  const contact = await models.getContactById(ID);
  if (contact) res.json(contact);
  else res.status(404).json({ message: "Not found" });
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
