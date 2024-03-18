const express = require("express");
const router = express.Router();
const contacts = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  const listContacts = await contacts.listContacts();
  res.json({
    message: "Contact List",
    status: "success",
    code: 200,
    data: listContacts,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);

  if (contact) {
    res.json({
      message: "Contact",
      status: "success",
      code: 200,
      data: contact,
    });
  } else {
    res.json({
      message: "Not found",
      status: "failed",
      code: 404,
    });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    let fieldName = "";

    if (!name) {
      fieldName = "name";
    } else if (!email) {
      fieldName = "email";
    } else {
      fieldName = "phone";
    }

    res.json({
      message: `missing required ${fieldName} field`,
      status: "failed",
      code: 400,
    });
  } else {
    const addContact = await contacts.addContact(name, email, phone);

    res.json({
      message: "Contact",
      status: "success",
      code: 201,
      data: addContact,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.removeContact(contactId);

  if (contact) {
    res.json({
      message: "contacto eliminado",
      status: "success",
      code: 200,
    });
  } else {
    res.json({
      message: "Not found",
      status: "failed",
      code: 404,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
