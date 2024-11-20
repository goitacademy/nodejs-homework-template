import fs from "fs/promises";
import path from "path";
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('models', 'contacts.json');

export const listContacts = async () => {
    const date = await fs.readFile(contactsPath);
    return JSON.parse(date);
};

export const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const contactById = contacts.find(({ id }) =>
        id === contactId
    )
    return contactById || null;
};

export const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const removeIndex = contacts.findIndex(({ id }) =>
        id === contactId
    );
    if (removeIndex === -1) {
        return null;
    };
    const removeContact = contacts.splice(removeIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return removeContact;
};

export const addContact = async ({name, email, phone}) => {
    const newContact = { id: nanoid(), name, email, phone };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
};


export const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) =>
    id === contactId
  );
  if (index === -1) {
    return null;
  };

  contacts[index] = { ...contacts[index], ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};