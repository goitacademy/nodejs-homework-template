import contacts from '../../db/contacts.json'
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, '../../db', '/contacts.json');

const addContact = async ({ name, email, phone }) => {
  const newContact = { name, email, phone, id: uuidv4() };
  contacts.push(newContact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
}

  export default addContact;