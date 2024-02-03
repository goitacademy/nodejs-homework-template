// Kontroler do obsługi tworzenia nowego kontaktu
import { addContact } from "#models/contacts.js";

async function createContacts(req, res, next) {
  const { body } = req;

  try {
    const newContact = await addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export { createContacts };
