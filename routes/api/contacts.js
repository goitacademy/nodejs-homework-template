const express = require("express");
const { listContacts, getContactById } = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const list = await listContacts();
  // console.table(list);
  res.json(list);
  // res.json({ message: "template message1" });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  res.json(contact);
  // res.json({ message: "template message2" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message3" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message4" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message5" });
});

module.exports = router;
