import { Contact } from "../model";
import { IContact } from "../helpers";

const getContacts = async () => await Contact.find();

const getContactById = async (contactId: string) =>
  await Contact.findById(contactId);

const postContact = async (contact: IContact) => {
  const newContact = await new Contact(contact);

  await newContact.save();

  return newContact;
};

const updateContact = async (contactId: string, contact: IContact) => {
  // await Contact.findByIdAndUpdate(contactId, { $set: contact });

  // const newContact = await Contact.findById(contactId);
  const newContact = await Contact.findByIdAndUpdate(contactId, {
    $set: contact,
  });

  return newContact;
};

const updateStatusContact = async (contactId: string, favorite: boolean) => {
  await Contact.findByIdAndUpdate(contactId, { favorite });

  const updatedContact = await Contact.findById(contactId);

  return updatedContact;
};

const deleteContact = async (contactId: string) => {
  const contact = await Contact.findByIdAndRemove(contactId);

  return contact;
};

export {
  getContacts,
  getContactById,
  postContact,
  updateContact,
  updateStatusContact,
  deleteContact,
};
