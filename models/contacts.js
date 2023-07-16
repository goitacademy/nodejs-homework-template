import fs from 'fs/promises';
import path from "path"
import { nanoid } from 'nanoid'

const contactsPath = path.resolve("models", "contacts.json");
const updateContactStorage = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const getContactById = async (id)=> {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id)
    return result || null

}
const removeContact = async(id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id)
    if(index === -1){
        return null
    }
    const [result] = contacts.splice(index, 1);
    await updateContactStorage(contacts)
return result
    
}

const addContact = async (data) => {
const contacts = await listContacts();
const newContact = {
    id: nanoid(),
    ...data,
}
contacts.push(newContact);
await updateContactStorage(contacts)
return newContact || null
}

const updateContact = async(id, {name, email, phone})=> {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id)
  if(index === -1){
      return null
  }
  contacts[index] = {id, name, email, phone}
  await updateContactStorage(contacts)
  return contacts[index];
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}