const express = require("express");

const actions = require("../../models/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await actions.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { contacts },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await actions.getContactById(contactId);
  res.json({
    status: "success",
    code: 200,
    data: { contact },
  });
});

router.post("/", async (req, res, next) => {
  const contact = await actions.addContact(req.body);
  res.json({
    status: "success",
    code: 201,
    data: { contact },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await actions.removeContact(contactId);
  res.json({
    status: "success",
    code: 204,
    data: { contact },
  });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await actions.updateContact(contactId, req.body);
  res.json({
    status: "success",
    code: 200,
    data: { contact },
  });
});

module.exports = router;
