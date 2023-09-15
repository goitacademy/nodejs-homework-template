import { Contact } from "./contacts.model.js";

export const getAllContact = async () => {
  try {
    return await Contact.find({});
  } catch (error) {
    console.error("Error while fetching contacts:", error);
    throw error;
  }
};

export const getContact = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    console.error("Error while fetching the contact:", error);
    throw error;
  }
};

export const addContact = async (contact) => {
  try {
    const newContact = new Contact(contact);
    return await newContact.save();
  } catch (error) {
    console.error("Error while adding the contact:", error);
    throw error;
  }
};

export const addContacts = async (contacts) => {
  try {
    return await Contact.insertMany(contacts);
  } catch (error) {
    console.error("Error while adding multiple contacts:", error);
    throw error;
  }
};

export const patchContact = async (contactId, partialContact) => {
  try {
    return await Contact.findOneAndUpdate(contactId, partialContact, {
      new: true,
    });
  } catch (error) {
    console.error("Error while updating the contact:", error);
    throw error;
  }
};

export const deleteContact = async (contactId) => {
  try {
    return await Contact.findByIdAndDelete(contactId);
  } catch (error) {
    console.error("Error while deleting the contact:", error);
    throw error;
  }
};

export const updateStatusContact = async (contactId, body) => {
  if (!body.favorite) {
    throw new Error("missing favorite field");
  }
  try {
    return await patchContact(contactId, { favorite: body.favorite });
  } catch (error) {
    console.error(
      "Error while updating the contact's status:",
      error
    );
    throw error;
  }
};
