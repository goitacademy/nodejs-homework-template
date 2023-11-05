import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";



export const contactsPath = path.resolve("models", "contacts.json");

 export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contactsList = JSON.parse(data);

    return contactsList;
  } catch (error) {
    console.error(error.message);
  }

}

export const getContactById = async (id) => {

  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === id);
    return contact || null;
  } catch (error) {
    
    console.error(error.message);
  }
}

export const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);

  await updateContact(contacts);
  return result;
}

export const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
  
    contacts.push(newContact);

    await updateContact(contacts);

    return newContact;
  } catch (error) {
    console.error(error.message);
  }
}

export const updateContactById = async (id,{name, email, phone}) => {
try {
  const contacts = await listContacts();
  
  const index = contacts.findIndex(contact => contact.id === id);
  if (index === -1) {
    return null;
  }
const updatedContact = {id, name, email, phone}
contacts[index] = {...updatedContact} 
await updateContact(contacts);
return contacts[index];
}
catch(error){
  console.error(error.message);
}

}

export const updateContact = async (contacts) => {
  try {

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
   console.error(error.message);
  }
}


