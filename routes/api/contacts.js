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
  try {
    const contacts = await listContacts();

    res.status(200).send({ contacts: contacts });
  } catch (err) {
    return "error";
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const getContact = await getContactById(req.params.contactId);
    res.status(200).send({ message: getContact });
  } catch (err) {
    return "error";
  }
});

router.post("/", async (req, res) => {
  try {
    const newContact = { contact: req.body };
    addContact(newContact);
    res.status(201).send({ message: "ok " });

    const getContact = await getContactById(req.params.contactId);
    res.status(200).send({ message: getContact });
  } catch (err) {
    return "error";
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    await removeContact(req.params.contactId);
    res.status(200).send({ message: "sadas" });
  } catch (err) {
    return "error";
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    updateContact(req.params.contactId, req.body);

    console.log(updateContact);
    res.status(203).send({ message: "sadas" });
  } catch (err) {
    return "error";
  }
});

module.exports = router;
