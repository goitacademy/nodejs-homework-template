const express = require("express");
const router = express.Router();
const Contacts = require("../../model");
const {
  createContactValidation,
  updateContactValidation,
  updateContactAddressValidation,
} = require("./validation");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({ status: "success", code: "200", data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.json({ status: "success", code: "200", data: { contact } });
    }
    return res.json({ status: "error", code: "404", message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.post("/", createContactValidation, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    if (contact?.name && contact?.email && contact?.phone) {
      return res
        .status(201)
        .json({ status: "success", code: "201", data: { contact } });
    }
    return res.json({
      status: "error",
      code: "404",
      message: "Missing required name field",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: "200",
        message: "Contact deleted",
      });
    }
    return res.json({ status: "error", code: "404", message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", updateContactValidation, async (req, res, next) => {
  try {
    if (!req.body) {
      return res.json({
        status: "error",
        code: "400",
        message: "Missing fields",
      });
    }
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact?.name && contact?.email && contact?.phone) {
      return res.json({ status: "success", code: "200", data: { contact } });
    }
    return res.json({
      status: "error",
      code: "404",
      message: "Not found",
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:contactId/address",
  updateContactAddressValidation,
  async (req, res, next) => {
    try {
      if (!req.body) {
        return res.json({
          status: "error",
          code: "400",
          message: "Missing fields",
        });
      }
      const contact = await Contacts.updateContact(
        req.params.contactId,
        req.body
      );
      if (contact?.name && contact?.email && contact?.phone) {
        return res.json({ status: "success", code: "200", data: { contact } });
      }
      return res.json({
        status: "error",
        code: "404",
        message: "Not found",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;