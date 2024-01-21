
import { getContactById } from '../../models/contacts.js';

async function showContacts(req, res, next) {
  const { contactId } = req.params;

  try {
    const contact = await getContactById(contactId);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    next(error);
  }
}

export { showContacts };