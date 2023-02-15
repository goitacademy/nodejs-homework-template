import { ContactModel } from 'models/contact.schema';
import { ContactType } from 'types/Contact.type';
import { ContactsQueryType } from 'types/ContactsQuery.type';

export const getContactsService = async (owner: string, { limit, skip, favorite, page }: ContactsQueryType) => {
  const searchQuery: { owner: string; favorite?: boolean } = { owner };
  if (favorite !== undefined) {
    searchQuery.favorite = favorite;
  }
  const contacts = await ContactModel.find(searchQuery).select({ __v: 0 }).limit(limit!).skip(skip!);

  return { contacts, page, limit };
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
