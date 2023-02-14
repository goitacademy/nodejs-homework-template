import { ContactModel } from 'models/contact.schema';
import { ContactType } from 'types/Contact.type';

export const getContactsService = async () => {
  const contacts = await ContactModel.find();

  return contacts;
};

export const getContactByIdService = async (contactId: string) => {
  const contacts = await ContactModel.findById(contactId);

  return contacts;
};

export const addContactService = async (contact: ContactType) => {
  const newContact = await ContactModel.create(contact);

  return newContact;
};

export const removeContactByIdService = async (contactId: string) => {
  const removedContact = await ContactModel.findByIdAndRemove({ _id: contactId });

  return removedContact;
};

export const updateContactByIdService = async (contactId: string, body: Partial<ContactType>) => {
  const updatedContact = await ContactModel.findByIdAndUpdate({ _id: contactId }, body, { new: true });

  return updatedContact;
};
