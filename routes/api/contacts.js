const express = require("express");
const Joi = require("joi");
const Contact = require("..//../models/contacts"); // Model Mongoose

const router = express.Router();

// Schemat walidacji dla kontaktu
const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
});

// Trasa GET /api/contacts - Pobierz wszystkie kontakty
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find(); // Pobieranie wszystkich kontaktów z MongoDB
    console.log("Kontakty z bazy danych:", contacts); // Sprawdź, czy zwraca dane
    res.json(contacts);
  } catch (error) {
    console.error("Błąd przy pobieraniu kontaktów:", error);
    res.status(500).json({ message: error.message });
  }
});

// Trasa GET /api/contacts/:contactId - Pobierz kontakt po ID
router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId); // Pobieranie kontaktu po ID
    if (!contact) {
      return res.status(404).json({ message: "Kontakt nie został znaleziony" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Trasa POST /api/contacts - Dodaj nowy kontakt
router.post("/", async (req, res) => {
  const { name, email, phone, favorite } = req.body;

  // Walidacja danych wejściowych
  const { error } = contactSchema.validate({ name, email, phone, favorite });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newContact = await Contact.create({ name, email, phone, favorite }); // Tworzenie nowego kontaktu
    console.log("Avatar URL:", newContact.avatarURL);

    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Trasa DELETE /api/contacts/:contactId - Usuń kontakt
router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId); // Usuwanie kontaktu po ID
    if (!deletedContact) {
      return res.status(404).json({ message: "Kontakt nie został znaleziony" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Trasa PUT /api/contacts/:contactId - Aktualizuj kontakt
router.put("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;

  // Walidacja danych wejściowych
  const { error } = contactSchema.validate({ name, email, phone, favorite });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { name, email, phone, favorite },
      { new: true } // Opcja `new: true` zwraca zaktualizowany dokument
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Kontakt nie został znaleziony" });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Trasa PATCH /api/contacts/:contactId/favorite - Aktualizuj status ulubionego kontaktu
router.patch("/:contactId/favorite", async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Kontakt nie został znaleziony" });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
