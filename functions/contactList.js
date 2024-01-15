import { contactList } from '../models/contacts.js';

export async function indexContact(req, res) {
  try {
    const contacts = await contactList();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}