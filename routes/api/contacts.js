const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res
      .status(404)
      .json({ message: "I am sorry! We don`t have contact with this id :( " });
  }
});

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ message: "missing required field" });
    return;
  }
  const newContact = await addContact(name, email, phone);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res) => {
  const newContacts = await removeContact(req.params.contactId);

  if (!newContacts) {
    res
      .status(404)
      .json({ message: "I am sorry! We don`t have contact with this id :( " });
  } else {
    res.status(200).json({ message: "Contact deleted!" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({ message: "missing required field" });
    return;
  }
  console.log(req.body);
  const updatedContact = await updateContact(
    req.params.contactId,
    name,
    email,
    phone
  );
  if (!updatedContact) {
    res
      .status(404)
      .json({ message: "I am sorry! We don`t have contact with this id :( " });
  } else {
    res.status(200).json(updatedContact);
  }
});

module.exports = router;
