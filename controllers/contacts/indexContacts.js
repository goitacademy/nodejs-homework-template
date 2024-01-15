import { listContacts } from '../../models/contacts.js';

async function indexContacts(req, res, next) {
  try {
    const contacts = await listContacts();

    res.status(200).json({ contacts, itemCount: contacts.length });
  } catch (error) {
    res.status(500).json(`An error occured: ${error}`);
  }
}

export { indexContacts };
