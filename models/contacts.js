import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const filepath = path.resolve("models", "contacts.json");

const updateContacts = contacts => fs.writeFile(filepath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(filepath);
    return JSON.parse(data);
}

const getContactById = async (id) => {
  const contacts = await listContacts();
    const result = contacts.find(item => item.id === id);
    return result || null;
}

const removeContact = async (id) => {
  const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }

    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
      email,
        phone,
    }
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

const updateContact = async (id, { name, email, phone }) => {
   const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    contacts[index] = {id, name, email, phone};
    await updateContacts(contacts);
    return contacts[index];
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
