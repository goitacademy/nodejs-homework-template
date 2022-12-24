const express = require("express");

const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  console.log(contacts);
  res.json({
    status: "success",
    code: 200,
    data: contacts,
  });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contact = await getById(id);
  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contacts = await addContact(name, email, phone);
  res.status(201).json({
    status: "success",
    code: 201,
    data: contacts,
  });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contacts = await removeContact(id);
  console.log(contacts);
  res.status(204).json();
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const contacts = await updateContact(id, name, email, phone);
  res.json({
    status: "success",
    code: 200,
    data: contacts,
  });
});

module.exports = router;
