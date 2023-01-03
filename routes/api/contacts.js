const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const list = await listContacts();
  res.json(list);
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  res.json(contact);
});

router.post("/", async (req, res, next) => {
  // const name = req.params.name;
  // const email = req.params.email;
  // const phone = req.params.phone;
  // const body = { name, email, phone };
  const body = req.body;
  console.log(body);
  if (body) {
    const contact = await addContact(body);
    res.status(201).json(contact);
  } else {
    res.status(400).json({ message: "missing required name field" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  if (id) {
    await removeContact(id);
    console.log("contact removed");
  }
  res.json({ message: "template message4" });
});

router.put("/:contactId", async (req, res, next) => {
  // updateContact(id, body);
  res.json({ message: "template message5" });
});

module.exports = router;
