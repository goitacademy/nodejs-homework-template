import fs from "fs";
import { nanoid } from "nanoid";
import { contactsPath } from "./contactsPath.js";
import { listContacts } from "./listContacts.js";

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContact);
    await fs.promises.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (er) {
    console.log(`Error ${er}`);
  }
}
