import { promises as fs } from "fs";
import path from "path";

const contactsFilePath = path.join(
  process.cwd(),
  "/routes/api/db/contacts.json"
);

let contacts = [];

export const readContactsFile = async () => {
  try {
    const data = await fs.readFile(contactsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // Jeśli plik nie istnieje, utwórz go z pustą tablicą
    if (error.code === "ENOENT") {
      await fs.writeFile(contactsFilePath, "[]", "utf-8");
      return [];
    }
    throw error;
  }
};

export const writeContactsFile = async (data) => {
  await fs.writeFile(contactsFilePath, JSON.stringify(data, null, 2), "utf-8");
};

export const listContacts = async () => {
  contacts = await readContactsFile();
  return contacts;
};

export const getContactById = async (contactId) => {
  contacts = await readContactsFile();
  return contacts.find((contact) => contact.id === contactId);
};

export const removeContact = async (contactId) => {
  contacts = await readContactsFile();
  contacts = contacts.filter((contact) => contact.id !== contactId);
  await writeContactsFile(contacts);
};

export const addContact = async (body) => {
  contacts = await readContactsFile();
  const newContact = { id: Date.now().toString(), ...body };
  contacts.push(newContact);
  await writeContactsFile(contacts);
  return newContact;
};

export const updateContact = async (contactId, body) => {
  contacts = await readContactsFile();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    await writeContactsFile(contacts);
    return contacts[index];
  }
  return null;
};

// export {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
