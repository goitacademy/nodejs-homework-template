const express = require("express");
const router = express.Router();
const Contacts = require("../../model");
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require("./validation");
// console.log(Contacts);
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
    return res.json({ status: "errro", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

router.post("/", validationCreateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    res.status(201).json({ status: "success", code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.json({ status: "success", code: 200, data: { contact } });
    }
    return res.json({ status: "errro", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validationUpdateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.json({ status: "success", code: 200, data: { contact } });
    }
    return res.json({ status: "errro", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:contactId/inArray",
  validationUpdateStatusContact,
  async (req, res, next) => {
    try {
      const contact = await Contacts.updateContact(
        req.params.contactId,
        req.body
      );
      if (contact) {
        return res.json({ status: "success", code: 200, data: { contact } });
      }
      return res.json({ status: "errro", code: 404, message: "Not Found" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
