const express = require("express");
const router = express.Router();

const { Contact } = require("../../db/mongoDB");

// GET /api/contacts
router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

// GET /api/contacts/:contactId
router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/contacts
router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ message: "Missing required fields" });
  } else {
    try {
      const newContact = await Contact.create({ name, email, phone });
      res.status(201).json(newContact);
    } catch (error) {
      next(error);
    }
  }
});

// DELETE /api/contacts/:contactId
router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const deleted = await Contact.findByIdAndRemove(contactId);
    if (deleted) {
      res.json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

// PUT /api/contacts/:contactId
router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { name, email, phone },
      { new: true }
    );

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Додайте маршрут PATCH /api/contacts/:contactId/favorite
router.patch("/:contactId/favorite", async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "Missing field favorite" });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { favorite: true }
    );

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
