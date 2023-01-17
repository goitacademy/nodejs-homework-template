const express = require("express");
const { listContacts, getContactById } = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const cont = await listContacts();
  res.json(cont);
});

router.get("/:contactId", async (req, res, next) => {
  const contId = await getContactById(req.query.id);
  console.log(req.query.id);
  res.json(contId);
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
