import * as contactsApi from 'models/contacts';
import { ContactType } from 'types/Contact.type';

export const getContactsService = async () => {
  const contacts = await contactsApi.listContacts();

  return contacts;
};

export const getContactByIdService = async (contactId: string) => {
  const contacts = await contactsApi.getContactById(contactId);

  return contacts;
};

export const addContactService = async (contact: ContactType) => {
  const newContact = await contactsApi.addContact(contact);

  return newContact;
};

export const removeContactByIdService = async (contactId: string) => {
  const removedContact = await contactsApi.removeContact(contactId);

  return removedContact;
};

export const updateContactByIdService = async (contactId: string, body: Partial<ContactType>) => {
  const updatedContact = await contactsApi.updateContact(contactId, body);

  return updatedContact;
};
