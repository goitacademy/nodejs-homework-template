import fs from 'fs/promises';
import path from 'path';
import { ContactType } from 'types/Contact.type';

const filePath = path.resolve(__dirname, 'contacts-list.json');

const updateContactsFile = async (data: ContactType[]) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};
// Get contacts list
export const listContacts = async (): Promise<ContactType[]> => {
  const contacts = await fs.readFile(filePath, 'utf8');

  return JSON.parse(contacts);
};
// Get contact by id
export const getContactById = async (contactId: string): Promise<ContactType | null> => {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);

  return contact || null;
};
// Remove contact by id
export const removeContact = async (contactId: string): Promise<ContactType | null> => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((c) => c.id === contactId);

  if (contactIndex === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(contactIndex, 1);
  await updateContactsFile(contacts);

  return removedContact;
};
// Add new contact
export const addContact = async (body: ContactType): Promise<ContactType> => {
  const contacts = await listContacts();
  contacts.push(body);
  await updateContactsFile(contacts);

  return body;
};
// Update existing contact
export const updateContact = async (contactId: string, body: Partial<ContactType>): Promise<ContactType | null> => {
  const contacts = await listContacts();
  let updatedContact: ContactType | null = null;

  const updatedContacts = contacts.map((c) => {
    if (c.id === contactId) {
      updatedContact = { ...c, ...body };
      return updatedContact;
    }
    return c;
  });

  if (updatedContact) {
    await updateContactsFile(updatedContacts);
  }

  return updatedContact || null;
};
