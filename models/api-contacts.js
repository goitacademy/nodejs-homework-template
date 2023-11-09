import Contact from "../models/contactModel.js";

export async function listContacts() {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.error("Error in listContacts:", error);
    throw error;
  }
}

export async function getContactById(contactId) {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    console.error("Error in getContactById:", error);
  }
}

export async function removeContact(contactId) {
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    return deletedContact;
  } catch (error) {
    console.error("Error in removeContact:", error);
  }
}

export async function addContact(contactData) {
  try {
    const newContact = await Contact.create(contactData);
    return newContact;
  } catch (error) {
    console.error("Error in addContact:", error);
  }
}

export async function updateContact(id, contactData) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, contactData, {
      new: true,
    });
    return updatedContact;
  } catch (error) {
    console.error("Error in updateContact:", error);
  }
}
