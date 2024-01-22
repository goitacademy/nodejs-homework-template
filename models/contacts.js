import path from "path";
import { Contact } from "./Contact.js";

const contactPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const readContacts = await Contact.find();
    return readContacts;
  } catch (err) {
    console.log("List not loaded", err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const readContact = await Contact.findOne({ _id: contactId });
    return readContact;
  } catch (err) {
    console.log("Contact not found", err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const deleteContact = await Contact.deleteOne({ _id: contactId });
    return deleteContact;
  } catch (err) {
    console.log("Delete not found", err.message);
  }
};

const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body);
    return newContact;
  } catch (err) {
    console.log("Delete not found", err.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const renameContact = await Contact.findOne({ _id: contactId });

    console.log(renameContact);
    if (body.name) {
      renameContact.name = body.name;
    }
    if (body.email) {
      renameContact.email = body.email;
    }
    if (body.phone) {
      renameContact.phone = body.phone;
    }

    await renameContact.save();
    return renameContact;
  } catch (err) {
    console.log("Not found", err.message);
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    const renameContact = await Contact.findOne({ _id: contactId });

    renameContact.favorite = body.favorite;

    await renameContact.save();
    return renameContact;
  } catch (err) {
    console.log({ message: "missing field favorite" });
  }
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
