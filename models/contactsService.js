const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Pakiet do generowania unikalnych ID

const contactsPath = path.join(__dirname, 'contacts.json'); // Ścieżka do pliku JSON

// Pobierz wszystkie kontakty
async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

// Pobierz kontakt na podstawie ID
async function getById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(c => c.id === contactId);
  return contact || null;
}

// Dodaj nowy kontakt
async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

// Usuń kontakt na podstawie ID
async function removeContact(contactId) {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter(c => c.id !== contactId);
  if (contacts.length === filteredContacts.length) {
    return null; // Nie znaleziono kontaktu
  }
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
  return true;
}

// Zaktualizuj kontakt
async function updateContact(contactId, { name, email, phone }) {
  const contacts = await listContacts();
  const index = contacts.findIndex(c => c.id === contactId);
  if (index === -1) {
    return null; // Nie znaleziono kontaktu
  }
  contacts[index] = { ...contacts[index], name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
