import { ContactModel } from 'models/contact.schema';
import { ContactType } from 'types/Contact.type';

export const getContactsService = async (owner: string) => {
  const contacts = await ContactModel.find({ owner }).select({ __v: 0 });

  return contacts;
};

export const getContactByIdService = async (contactId: string, owner: string) => {
  const contacts = await ContactModel.findOne({ _id: contactId, owner }).select({ __v: 0 });

  return contacts;
};

export const addContactService = async (contact: ContactType) => {
  const newContact = await ContactModel.create(contact);

  return newContact;
};

export const removeContactByIdService = async (contactId: string, owner: string) => {
  const removedContact = await ContactModel.findByIdAndRemove({ _id: contactId, owner }).select({ __v: 0 });

  return removedContact;
};

export const updateContactByIdService = async (contactId: string, body: Partial<ContactType>, owner: string) => {
  const updatedContact = await ContactModel.findByIdAndUpdate({ _id: contactId, owner }, body, { new: true }).select({
    __v: 0,
  });

  return updatedContact;
};
