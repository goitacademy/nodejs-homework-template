// controllers/contacts/showContacts.js
import { getContactById } from '../../models/contacts/contacts.js';

async function showContacts(req, res, next) {
  const { contactId } = req.params;

  try {
    const contact = await getContactById(contactId);

    if (contact) {
      return res.status(200).json(contact);
    } else {
      return res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    next(error);
  }
}

export { showContacts };