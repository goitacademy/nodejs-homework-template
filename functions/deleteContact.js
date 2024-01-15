import { contactList, removeContact } from '../models/contacts.js';

export async function deleteContact(req, res) {
  const { contactId } = req.params;
  try {
    const contacts = await contactList();
    const contact = contacts.find(contact => contact?.id === contactId);
    if (contact) {
      await removeContact(contactId);
      res.status(200).json({ message: 'Contact deleted' });
      return;
    }
    res.status(404).json({ message: 'Not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}