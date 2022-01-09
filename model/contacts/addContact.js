import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import contacts from '../../db/contacts.json';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const contactsPath = path.join(__dirname, "../../db/contacts.json");

const addContact = async ({ name, email, phone }) => {
    const newContact = { id: randomUUID(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(
      contactsPath, 
      JSON.stringify(contacts, null, 2),
    )
    return newContact;
};

export default addContact;