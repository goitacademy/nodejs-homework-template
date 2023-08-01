const express = require("express");

const contacts = require("../../models/contacts");

const router = express.Router();

const {HttpError} = require('../../helpers/HtppError')

router.get("/", async (req, res) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
       throw HttpError(404, "Not found");
      // const err = new Error("Not found");
      // err.status = 404;
      // throw err;
      // return res.status(404).json({
      //   message: "Not found",
      // });
    }
    res.json(contact);
  } catch (err) {
    const { status = 500, message = "Server error"} = err;
    res.status(status).json({
      message,
    });
  }
});

router.post("/", async (req, res) => {
  const { name, email, phone } = { ...req };
  const newContact = await contacts.addContact({ name, email, phone });
  res.json(newContact);
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const removeContact = await contacts.removeContact(contactId);
  res.json(removeContact);
});

router.put("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = { ...req };
  const updateContactId = await contacts.updateContact(contactId, {
    name,
    email,
    phone,
  });
  res.json(updateContactId);
});

module.exports = router;
