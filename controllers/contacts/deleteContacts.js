import { removeContact } from '../../models/contacts/contacts.js';

async function deleteContacts(req, res, next) {
  const { contactId } = req.params;

  try {
    const result = await removeContact(contactId);

    if (result) {
      return res.status(200).json({ message: 'Contact deleted' });
    } else {
      return res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    next(error);
  }
}

export { deleteContacts };