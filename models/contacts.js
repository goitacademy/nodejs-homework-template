const fs = require("fs/promises");
const path = require("path");
const { contactSchema } = require("../middlewares/validateContact");

// Ścieżka do pliku z kontaktami
const contactsPath = path.join(__dirname, "contacts.json");

// Funkcja pomocnicza do odczytywania kontaktów z pliku
async function readContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

// Funkcja pomocnicza do zapisywania kontaktów do pliku
async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

// Pobieranie wszystkich kontaktów
async function listContacts() {
  return await readContacts();
}

// Pobieranie kontaktu po ID
async function getContactById(contactId) {
  const contacts = await readContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

// Usuwanie kontaktu
async function removeContact(contactId) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(index, 1);
  await writeContacts(contacts);
  return removedContact;
}

// Dodawanie nowego kontaktu
async function addContact(name, email, phone) {
  const { nanoid } = await import("nanoid");
  const contacts = await readContacts();

  const { error } = contactSchema.validate({ name, email, phone });
  if (error) {
    throw new Error(error.details[0].message);
  }

  // Tworzenie nowego kontaktu
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

// Aktualizowanie kontaktu
async function updateContact(contactId, body) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const { error } = contactSchema.validate(body);
  if (error) {
    throw new Error(error.details[0].message);
  }

  // Aktualizowanie kontaktu na podstawie przekazanego body
  contacts[index] = { ...contacts[index], ...body };
  await writeContacts(contacts);
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
