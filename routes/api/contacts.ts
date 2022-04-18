import express from "express";
// const contactsModel = require('../../models/contacts')
const { listContacts } = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log("test1", typeof listContacts);
  const contacts = await listContacts();
  // const contacts = await contactsModel.listContacts();
  console.log("contacts", contacts);
  res.json({ status: "success", code: 200, payload: { contacts } });
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

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
