const Contacts = require("../../model/contacts");
const express = require("express");
const router = express.Router();
const {
  validateAddContact,
  validateUpdateContact,
  validateStatusFavoriteContact,
} = require("./validation");

router.get("/", async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res
      .status(200)
      .json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const contactById = await Contacts.getContactById(req.params.id);
    if (contactById) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contactById } });
    }
    return res
      .status()
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

router.post("/", validateAddContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res
      .status(201)
      .json({ status: "success", code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.id);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateUpdateContact, async (req, res, next) => {
  try {
    const updContact = await Contacts.updateContact(req.params.id, req.body);
    if (updContact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { updContact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id/favorite",
  validateStatusFavoriteContact,
  async (req, res, next) => {
    try {
      if (!req.body.favorite) {
        return res.status(400).json({
          status: "error",
          code: 400,
          message: "missing field favorite",
        });
      }
      const updContact = await Contacts.updateStatusContact(
        req.params.id,
        req.body
      );
      if (updContact) {
        return res
          .status(200)
          .json({ status: "success", code: 200, data: { updContact } });
      }
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not Found" });
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
