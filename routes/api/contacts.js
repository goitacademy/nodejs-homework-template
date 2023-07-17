const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const contacts = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const result = await contacts.listContacts();
  return res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  const { id } = req.query;
  const result = await contacts.getContactById(id);
  if (!result) return res.json({ message: "Not found", status: 404 });
  return res.json(result);
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.query;
  if (!name || !email || !phone)
    return res.json({ message: "missing required name field", status: 400 });
  const id = crypto.randomBytes(16).toString("hex");
  const result = await contacts.addContact(id, req.query);
  res.json({ result, status: 201 });
});

router.delete("/:contactId", async (req, res, next) => {
  const { id } = req.query;
  const result = await contacts.removeContact(id.toString().trim());
  result
    ? res.json({ message: "contact deleted", status: 200 })
    : res.json({ message: "Not found", status: 404 });
});

router.put("/:contactId", async (req, res, next) => {
  console.log(req.query);
  if (!req.query.name && !req.query.email && !req.query.phone)
    return res.json({ message: "missing fields", status: 400 });
  const { id } = req.query;
  const result = await contacts.updateContact(id.trim(), req.query);
  result
    ? res.json({ ...result, status: 200 })
    : res.json({ message: "Not found", status: 404 });
  console.log(result);
});

module.exports = router;
