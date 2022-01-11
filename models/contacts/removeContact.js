import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import contacts from '../../db/contacts.json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const contactsPath = path.join(__dirname, '..', '..', 'db', 'contacts.json');

const removeContact = async (contactId) => {
    const [contact] = contacts.filter((contact) => contact.id === contactId);
    contacts.splice(contacts.indexOf(contact), 1);
    await fs.writeFile(
        contactsPath,
        JSON.stringify(contacts, null, 2),
    )

    return contact;
};

export default removeContact;

