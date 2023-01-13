const express = require("express");
const contacts = require("../../models/contacts.json");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(contacts);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const contact = contacts.filter((contact) => contact.id === req.params.id);
 
  res.send(contact);
});

router.post("/", (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  const contact = {
    id: Date.now(),
    name,
    email,
    phone,
  };
  console.log("-contact add to db", newContact);
  res.status(201).send(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
