const express = require("express");
const router = express.Router();
const Contacts = require("../../model");
const { validatedNewContact, validatedUpdateContact } = require("./validation");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({ status: "success", code: 200, payload: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    console.log(req.params.id);
    if (contact) {
      return res.status(201).json({ status: "success", code: 201, payload: { contact } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.post("/", validatedNewContact, async (req, res, next) => {
  try {
    const contacts = await Contacts.addContact(req.body);
    return res.status(201).json({ status: "success", code: 201, payload: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.status(200).json({ status: "success", code: 200, message: "Contact deleted", payload: { contact } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validatedUpdateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body);
    if (Object.keys(req.body).length === 0)
      res.status(404).json({ status: "error", code: 404, message: "Missing fields" });
    if (contact) res.status(201).json({ status: "success", code: 201, payload: { contact } });
    return res.json({ status: "error", code: 404, message: "Contact not found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
