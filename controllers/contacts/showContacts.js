import { getContactById } from '../../models/contacts.js';

async function showContacts(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.status(200).json(contact);
    }
  } catch (error) {
    res.status(500).json(`An error occured: ${error}`);
  }
}

export { showContacts };
