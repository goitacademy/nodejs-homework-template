import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import contacts from '../../db/contacts.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, '../../db', '/contacts.json');

const updateContact = async (contactId, body) => {
  const updateIndex = contacts.findIndex((contact) => contact.id === contactId);
  if (updateIndex !== -1) {
    const updatedContact = { id: contactId, ...contacts[updateIndex], ...body };
    contacts[updateIndex] = updatedContact;
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2)
      );
    return updatedContact;
    }
    return null;
}

  export default updateContact