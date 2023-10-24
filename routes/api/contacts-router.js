const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  const result = await getContactById();
  res.json(result);
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
