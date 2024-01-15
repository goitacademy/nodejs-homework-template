import { getContactById } from '../models/contacts.js';

export async function showContact(req, res) {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (contact.length !== 0) {
      res.status(200).json(contact);
      return;
    }
    res.status(404).json({ message: 'Not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}