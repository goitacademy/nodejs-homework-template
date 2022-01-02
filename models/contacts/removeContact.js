import Contact from '../contacts/index';
// import fs from 'fs/promises';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const contactsPath = path.join(__dirname, '../../db', '/contacts.json');

// const removeContact = async (contactId) => {
//   const removeIndex = contacts.findIndex((contact) => contact.id === contactId);
//   if (removeIndex !== -1) {
//     const newContacts = contacts.filter((contact) => contact.id !== contactId);
//     await fs.writeFile(
//       contactsPath,
//       JSON.stringify(newContacts, null, 2)
//     );
//     return contacts[removeIndex];
//   }
//   return null;
// }

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId)
  return result
}

export default removeContact;