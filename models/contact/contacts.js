import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { ContactModel } from "./contactShema.js";

export const listContacts = async (userId) => {
  try {
    const contacts = await ContactModel.find({ owner: userId }); // Filtrowanie kontaktów po owner
    console.log("[DB] Contacts fetched successfully".bgGreen);
    return contacts;
  } catch (error) {
    console.error(`[DB] Error fetching contacts: ${error.message}`.red);
    throw new Error("Error fetching contacts from the database");
  }
};

export const getContactById = async (contactId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      console.error(`Invalid ID format: ${contactId}`.bgYellow);
      return null;
    }

    const contact = await ContactModel.findById(contactId);

    if (!contact) {
      console.error(`Contact with ID: ${contactId} not found`.bgYellow);
      return null;
    }

    return contact;
  } catch (error) {
    console.error(`Error getContactById: ${error.message}`.bgRed);
    throw new Error(`Unable to fetch contact by ID: ${contactId}`);
  }
};

export const removeContact = async (contactId) => {
  try {
    const removedContact = await ContactModel.findByIdAndDelete(contactId);

    if (!removedContact) {
      console.error(`Contact with ID: ${contactId} not found`.bgYellow);
      return null;
    }

    console.log(`Contact with ID: ${contactId} removed successfully`.bgGreen);
    return removedContact;
  } catch (error) {
    console.error(`Error removing contact: ${error}`.bgRed);
    return null;
  }
};

export const addContact = async (body) => {
  try {
    const { name, email, phone, favorite, owner } = body;

    const contact = new ContactModel({
      // id: nanoid(),
      name,
      email,
      phone,
      favorite: favorite || false,
      owner,
    });

    await contact.save();
    console.log(`Contact added successfully`.bgGreen);
    console.log(contact.name.bgGreen);
    return contact;
  } catch (error) {
    console.error(`Error addContact: ${error} [contacts.js]`.bgRed);
  }
};

export const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await ContactModel.findByIdAndUpdate(
      contactId,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      console.error(`Contact with ID: ${contactId} not found`);
      return null;
    }

    console.log(`Contact with ID: ${contactId} updated successfully`);
    return updatedContact;
  } catch (error) {
    console.error(`Error updateContact: ${error}`);
    return null;
  }
};

export const updateStatusContact = async (contactId, body) => {
  try {
    if (!Object.prototype.hasOwnProperty.call(body, "favorite")) {
      console.error(`Missing "favorite" field in body`);
      return null;
    }

    const updatedContact = await ContactModel.findByIdAndUpdate(
      contactId,
      { favorite: body.favorite },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      console.error(`Contact with ID: ${contactId} not found`);
      return null;
    }

    console.log(`Contact with ID: ${contactId} updated successfully`);
    return updatedContact;
  } catch (error) {
    console.error(`Error updating favorite field: ${error}`);
    return null;
  }
};
