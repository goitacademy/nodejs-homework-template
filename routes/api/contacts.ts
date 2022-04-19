import express from "express";
const contactsModel = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await contactsModel.listContacts();
  res.json({ status: "success", code: 200, payload: { contacts } });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await contactsModel.getContactById(req.params.contactId);
  if (contact) {
    return res.json({ status: "success", code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
});

router.post("/", async (req, res, next) => {
  const contact = await contactsModel.addContact(req.body);
  res.status(201).json({ status: "success", code: 201, payload: { contact } });
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await contactsModel.removeContact(req.params.contactId);
  if (contact) {
    return res.json({ status: "success", code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
});

router.put("/:contactId", async (req, res, next) => {
  const contact = await contactsModel.updateContact(
    req.params.contactId,
    req.body
  );
  if (contact) {
    return res.json({ status: "success", code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
});

router.patch("/:contactId", async (req, res, next) => {
  const contact = await contactsModel.updateContact(
    req.params.contactId,
    req.body
  );
  if (contact) {
    return res.json({ status: "success", code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
});

module.exports = router;
