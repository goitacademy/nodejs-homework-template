const express = require("express");
const router = express.Router();
const Contacts = require("../../model/index");

const {
  validationCreateContact,
  validationUpdateContact,
} = require("./validation");

router.get("/", async (req, res, next) => {
  try {
    const data = await Contacts.listContacts();
    return res.json({ status: "success", code: 200, data });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    console.log(req.params.contactId);
    const result = await Contacts.getContactById(req.params.contactId);
    console.log(Contacts);
    if (result) {
      return res.json({ status: "succes", code: 200, data: { result } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (e) {
    next(e);
  }
});

router.post("/", validationCreateContact, async (req, res, next) => {
  try {
    const result = await Contacts.addContact(req.body);
    res.status(201).json({ status: "succes", code: 201, data: { result } });
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const data = await Contacts.removeContact(req.params.contactId);
    if (data) {
      return res.json({ status: "success", code: 200, data });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validationUpdateContact, async (req, res, next) => {
  try {
    const result = await Contacts.updateContact(req.params.contactId, req.body);
    if (result) {
      return res.json({ status: "succes", code: 200, data: { result } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
