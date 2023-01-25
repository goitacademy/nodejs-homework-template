const { json } = require("express");
const express = require("express");
const contactsFn = require("../../models/contacts");
const validation = require("../../validation/validation")

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await contactsFn.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { contacts },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsFn.getContactById(contactId);
  if (contact) {
    res.json({ status: "success", code: 200, data: { contact } });
  }
  res.json({
    status: "bad request",
    code: 404,
    message: "Not found",
  });
});

router.post("/", async (req, res, next) => {
  const contact = req.body;
  // VALIDATION
  if (validation.validationAddContact(contact).error) {
    return res.json({
      status: "failed",
      code: 400,
      message: 'Missing required name field'
    })
  }
  const newContact = await contactsFn.addContact(contact);
  res.json({
    status: "success",
    code: 201,
    data: { newContact } });
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params;
  const contact = contactsFn.removeContact(contactId);
  if (contact) {
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } else res.json({
      status: "failed",
      code: 404,
      message: "Not found"
    });
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params;
  const body = req.body;
  if (validation.validationUpdateContact.error(body)){
    return res.json({
      status: failed,
      code: 400,
      message: "missing fields"
    })
  }
  const contact = await contactsFn.updateContact(contactId, body);
  if (contact) {
  res.json({
    status: "succes",
    code: 200,
    data: {contact}

   });}
   else {
    return res.status(404).json({
      status: "failure",
      code: 404,
      message: "not found"
    })
   }
});

module.exports = router;
