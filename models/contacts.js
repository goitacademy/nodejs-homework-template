import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";
import { Schema, model } from "mongoose";
const contactsPath = path.resolve("models", "contacts.json");

// const updateContacts = (contacts) =>
//   fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});
export const Contact = model("Contact", contactSchema)

// async function listContacts() {
//   const data = await Contact.find();
//   return JSON.parse(data);
// }

// async function getContactById(contactId) {
//   const contacts = await listContacts();
//   const result = contacts.find((item) => item.id === contactId);
//   return result || null;
// }

// async function removeContact(contactId) {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
// await updateContacts(contacts)
//   return result;
// }

// async function addContact({name, email, phone}) {
//   const contacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     name,
//     email,
//     phone,
//   };
//   contacts.push(newContact);
// await updateContacts(contacts)
//   return newContact;
// }

// async function updateContactById (contactId, body){
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { id: contactId, ...body };
//   await updateContacts(contacts);
//   return contacts[index];
// };
export default {
  // getContactById,
  // removeContact,
  // addContact,
  // listContacts,
  // updateContactById,
  Contact
};
