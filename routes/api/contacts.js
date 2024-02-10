const express = require("express");

const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsController");
const {
  contactSchema,
  favoriteSchema,
  validateContactId,
} = require("../../controllers/validationController");

router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const contacts = await listContacts(page, limit);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", validateContactId, async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = contactSchema.validate(req.body, { abortEarly: false });

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const newContact = await addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error handling the POST request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:contactId", validateContactId, async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await removeContact(contactId);
    if (result) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validateContactId, async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const { error } = contactSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const updatedContact = await updateContact(contactId, { name, email, phone });

  if (updatedContact) {
    return res.status(200).json(updatedContact);
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

router.patch("/:contactId/favorite", validateContactId, async (req, res) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (favorite === undefined) {
      return res.status(400).json({ message: "missing field favorite" });
    }

    const { error } = favoriteSchema.validate(
      { favorite },
      { abortEarly: false }
    );

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const updatedContact = await updateStatusContact(contactId, { favorite });

    if (updatedContact) {
      return res.status(200).json(updatedContact);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error("Error in PATCH /api/contacts/:contactId/favorite:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
