import path from "path";
import fs from "fs";
import { nanoid } from "nanoid";
import { listContacts } from "./indexContacts.js";

const contactsPath = path.join(process.cwd(), "models", "contacts.json");

export async function addContact(body) {
  try {
    const data = await listContacts();
    const newContact = { id: nanoid(), ...body };
    data.push(newContact);
    await fs.promises.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return newContact;
  } catch (e) {
    console.log(e.toString());
  }
}
