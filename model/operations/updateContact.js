import fs from 'fs/promises';
import path from 'path';
import contacts from '../../db/contacts.json';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const contactsPath = path.join(__dirname, "../../db/contacts.json");

const updateContact = async (contactId, body) => {
    const id = contacts.findIndex(({ id }) => id.toString() === contactId); 
  
    if (id === -1) {
      return;
    }
  
    const updatedContact = { id: contactId, ...contacts[id], ...body };
    contacts[id] = updatedContact;
  
    await fs.writeFile(
      contactsPath, 
      JSON.stringify(contacts, null, 2),
    )
    return updatedContact;
};

export default updateContact;