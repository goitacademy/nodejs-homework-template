const express = require("express");
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  toggleFavoriteContact,
} = require("../../models/contacts");
const {
  addValidation,
  updateValidation,
} = require("../middlewares/validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await getContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).send(error.message);
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
    next(error);
  }
});

router.post("/", addValidation, async (req, res, next) => {
  const contact = await addContact(req.body);
  if (!contact) {
    return res.status(500).send("Write error");
  }
  res.status(201).json(contact);
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contacts = await removeContact(req.params.contactId);
    if (contacts) {
      res.status(200).json({ message: "The contact was deleted successfully" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
    next(error);
  }
});

router.put("/:contactId", updateValidation, async (req, res, next) => {
  try {
    const contacts = await updateContact(req.params.contactId, req.body);
    if (contacts) {
      res.status(200).json(contacts);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const contacts = await toggleFavoriteContact(req.params.contactId);
    if (contacts) {
      res.status(200).json(contacts);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send(error);

    next(error);
  }
});

module.exports = router;
