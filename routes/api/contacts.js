const express = require("express");
const router = express.Router();

const contactsController = require("../../controllers/contactController");
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
  validateIdContact,
} = require("../../models/contact");
const auth = require("../../auth/auth");

const idValidation = async (req, res, next) => {
  const { contactId } = req.params;
  const { error } = validateIdContact({ contactId });
  if (error) {
    return res.status(400).json({ message: "Invalid id" });
  }
  const contact = await contactsController.getContactById(contactId);
  if (!contact) {
    return res
      .status(404)
      .json({ message: `Contact with id=${contactId} was not found.` });
  }
  next();
};

router.get("/", auth, async (req, res, next) => {
  const { page, limit, favorite } = req.query;
  const options = {
    page: page || 1,
    limit: limit || 10,
    collation: {
      locale: "en",
    },
    favorite: favorite || null,
  };

  try {
    const contacts = await contactsController.listContacts(options);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", auth, idValidation, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsController.getContactById(contactId);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { error } = validateCreateContact(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const newContact = await contactsController.addContact(req.body);
    res.status(200).json(newContact);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:contactId", auth, idValidation, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await contactsController.removeContact(contactId);
    res
      .status(200)
      .json({ message: `Contact with id=${contactId} was deleted.` });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.put("/:contactId", auth, idValidation, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = validateUpdateContact(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const contact = await contactsController.updateContact(contactId, req.body);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.patch(
  "/:contactId/favorite",
  auth,
  idValidation,
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const { error } = validateUpdateStatusContact(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      const contact = await contactsController.updateContactStatus(
        contactId,
        req.body
      );
      res.status(200).json(contact);
    } catch (error) {
      next(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;