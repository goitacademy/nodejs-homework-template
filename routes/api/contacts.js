const express = require("express");
const contactsModule = require("../../models/contacts.js");
const { schema } = require("./contacts-validation-schemes");
const { validateBody } = require("../../middlewares/validation.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await contactsModule.listContacts();
  res.json({ status: "success", code: 200, payload: { contacts } });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await contactsModule.getContactById(req.params.contactId);
  if (contact) {
    return res.json({ status: "success", code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
});

router.post("/", validateBody(schema), async (req, res, next) => {
  const contact = await contactsModule.addContact(req.body);
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ status: "error", code: 400, message: "missing fields" });
  }
  return res
    .status(201)
    .json({ status: "success", code: 201, payload: { contact } });
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await contactsModule.removeContact(req.params.contactId);
  if (contact) {
    return res.json({ status: "success", code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
});

router.put("/:contactId", validateBody(schema), async (req, res, next) => {
  const contact = await contactsModule.updateContact(
    req.params.contactId,
    req.body
  );
  if (Object.keys(req.body).length === 0) {
    res
      .status(400)
      .json({ status: "error", code: 400, message: "missing fields" });
  }
  if (contact) {
    return res.json({ status: "success", code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
});

module.exports = router;
