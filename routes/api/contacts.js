const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const getContacts = () => {
  // Używamy process.cwd() do wskazania katalogu głównego projektu
  const contactsFilePath = path.join(
    __dirname,
    "..",
    "..",
    "models",
    "contacts.json"
  );
  console.log("Contacts file path:", contactsFilePath); // Wypiszmy ścieżkę, by upewnić się, że jest poprawna
  const data = fs.readFileSync(contactsFilePath, "utf-8");
  return JSON.parse(data);
};

const saveContacts = (contacts) => {
  // Używamy process.cwd() do wskazania katalogu głównego projektu
  const contactsFilePath = path.join(
    __dirname,
    "..",
    "..",
    "models",
    "contacts.json"
  );
  fs.writeFileSync(
    contactsFilePath,
    JSON.stringify(contacts, null, 2),
    "utf-8"
  );
};

const Joi = require("joi");

// Schemat walidacji dla kontaktu
const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(), // Imię musi mieć od 3 do 30 znaków
  email: Joi.string().email().required(), // Poprawny adres e-mail
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/) // Numer w formacie np. (123) 456-7890
    .required(),
});

// Trasa GET /api/contacts
router.get("/", async (req, res) => {
  try {
    const contacts = getContacts(); // Pobieramy dane kontaktów z pliku
    res.json(contacts); // Zwracamy całą listę kontaktów
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Trasa GET /api/contacts/:contactId
router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params; // Pobieramy contactId z URL
  const contacts = getContacts(); // Pobieramy dane kontaktów z pliku
  const contact = contacts.find((c) => c.id === contactId); // Szukamy kontaktu o danym ID

  if (contact) {
    res.json(contact); // Jeśli znaleziono kontakt, zwróć go
  } else {
    res.status(404).json({ message: "Kontakt nie został znaleziony" }); // Jeśli nie znaleziono kontaktu, zwróć błąd 404
  }
});

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  // Walidacja danych wejściowych
  const { error } = contactSchema.validate({ name, email, phone });
  if (error) {
    return res.status(400).json({ message: error.details[0].message }); // Zwróć szczegółowy błąd walidacji
  }

  const newContact = {
    id: Date.now().toString(), // Simple ID generator (using timestamp)
    name,
    email,
    phone,
  };

  try {
    const contacts = getContacts(); // Pobieramy dane z pliku
    contacts.push(newContact); // Dodajemy nowy kontakt
    saveContacts(contacts); // Zapisujemy zmiany do pliku
    res.status(201).json(newContact); // Zwracamy nowy kontakt
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Trasa DELETE /api/contacts/:contactId - Usunięcie kontaktu
router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;

  try {
    const contacts = getContacts(); // Pobieramy dane kontaktów z pliku
    const updatedContacts = contacts.filter((c) => c.id !== contactId); // Usuwamy kontakt o danym ID

    if (contacts.length === updatedContacts.length) {
      return res.status(404).json({ message: "Kontakt nie został znaleziony" });
    }

    saveContacts(updatedContacts); // Zapisujemy zmiany w pliku
    res.status(204).end(); // No content, successful deletion
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Trasa PUT /api/contacts/:contactId - Aktualizacja kontaktu
router.put("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  // Walidacja danych wejściowych
  const { error } = contactSchema.validate({ name, email, phone });
  if (error) {
    return res.status(400).json({ message: error.details[0].message }); // Zwróć szczegółowy błąd walidacji
  }

  try {
    const contacts = getContacts(); // Pobieramy dane kontaktów z pliku
    const contactIndex = contacts.findIndex((c) => c.id === contactId);

    if (contactIndex !== -1) {
      contacts[contactIndex] = { id: contactId, name, email, phone };
      saveContacts(contacts); // Zapisujemy zmiany w pliku
      res.json(contacts[contactIndex]); // Zwracamy zaktualizowany kontakt
    } else {
      res.status(404).json({ message: "Kontakt nie został znaleziony" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
