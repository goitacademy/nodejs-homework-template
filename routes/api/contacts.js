const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  // console.table(contacts);

  res.status(200).send({ contacts: contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const getContact = await getContactById(req.params.contactId);
  res.status(200).send({ message: getContact });
});

router.post("/", async (req, res) => {
  const newContact = { contact: req.body };
  addContact(newContact);
  res.status(201).send({ message: "ok " });
});

router.delete("/:contactId", async (req, res, next) => {
  // console.log(req.params.contactId);
  await removeContact(req.params.contactId);
  res.status(200).send({ message: "sadas" });
});

router.put("/:contactId", async (req, res, next) => {
  // const updateData = req.params(req.body);
  // console.log(req.params.contactId);

  updateContact(req.params.contactId, req.body);

  console.log(updateContact);
  res.status(203).send({ message: "sadas" });
});

module.exports = router;
