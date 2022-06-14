import { listContacts } from "./listContacts.js";
import { v4 } from "uuid";
import { updateContacts } from "./updateContacts.js";

export const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
};
