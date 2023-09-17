const express = require("express");
const router = express.Router();
const Contact = require("../../models/contacts");
const authenticate = require("../../middlewares/auth");

// Pobieranie wszystkich kontaktów
router.get("/", authenticate, async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

// Pobieranie kontaktu po ID
router.get("/:contactId", authenticate, async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const contact = await Contact.findById(contactId);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Dodawanie nowego kontaktu
router.post("/", async (req, res, next) => {
  const body = req.body;
  try {
    const newContact = await Contact.create(body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// Usuwanie kontaktu po ID
router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const result = await Contact.deleteOne({ _id: contactId });
    if (result.deletedCount > 0) {
      res.json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Aktualizowanie kontaktu po ID
router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Pobieranie statusu ulubionego kontaktu po ID
router.get("/:contactId/favorite", async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    // Spróbuj znaleźć kontakt o danym identyfikatorze
    const contact = await Contact.findById(contactId);

    if (!contact) {
      // Jeśli kontakt nie istnieje, zwróć "Not found"
      return res.status(404).json({ message: "Contact not found" });
    }

    // Jeśli kontakt istnieje, zwróć jego status ulubionego
    res.json({ favorite: contact.favorite });
  } catch (error) {
    next(error);
  }
});

// Aktualizowanie statusu ulubionego kontaktu
router.patch("/:contactId/favorite", async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;

  // Sprawdź, czy body zawiera pole 'favorite'
  if (!body.favorite) {
    return res.status(400).json({ message: "Missing field favorite" });
  }

  try {
    // Spróbuj zaktualizować status ulubionego kontaktu
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: body.favorite },
      { new: true }
    );

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    next(error);
  }

  console.log("Request body:", req.body);
});

module.exports = router;
