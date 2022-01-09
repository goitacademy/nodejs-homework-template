import fs from 'fs/promises';
import path from 'path';
import contacts from '../../db/contacts.json';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const contactsPath = path.join(__dirname, "../../db/contacts.json");

const removeContact = async (contactId) => {
    const id = contacts.findIndex(({ id }) => id.toString() === contactId);
  
    if (id === -1) {
      return;
    }
  
    const deletedContact = contacts.splice(id, 1);
  
    await fs.writeFile(
      contactsPath, 
      JSON.stringify(contacts, null, 2),
    )
    return deletedContact;
};

export default removeContact;