import { removeContact } from '../../models/contacts.js';

async function deleteContacts(req, res, next) {
  try {
    const { contactId } = req.params;
    const isDeleted = await removeContact(contactId);

    if (!isDeleted) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.status(200).json({ message: 'Contact deleted' });
    }
  } catch (error) {
    res.status(500).json(`An error occured: ${error}`);
  }
}

export { deleteContacts };
