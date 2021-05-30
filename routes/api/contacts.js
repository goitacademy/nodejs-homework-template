const express = require("express");
const router = express.Router();
const Contacts = require("../../model");
const {
  validationCreateContact,
  validationUpdateContact,
} = require("./validation");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.json({ status: "success", code: 200, data: { contact } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.post("/", validationCreateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    if (contact) {
      return res
        .status(201)
        .json({ status: "success", code: 201, data: { contact } });
    }
    return res.json({
      status: "error",
      code: 400,
      message: "missing required name field",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const conatct = await Contacts.removeContact(req.params.contactId);
    if (conatct) {
      return res.json({ status: "success", code: 200, data: { conatct } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validationUpdateContact, async (req, res, next) => {
  try {
    const conatct = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (conatct) {
      return res.json({ status: "success", code: 200, data: { conatct } });
    }
    return res.json({ status: "error", code: 400, message: "Missing fields" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
