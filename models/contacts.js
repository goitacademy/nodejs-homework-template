import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");
const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async() => {
   const data = await fs.readFile(contactsPath);
   return JSON.parse(data);
  }
  
  export const getContactById = async(id) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id);
    return result || null;
  }
  
  export const removeContact = async(id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index,1);
    await updateContacts(contacts);
    return result;
  }
  
  export const addContact = async({name, email, phone}) => {
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
  export const updateContactById = async(id, {name, email, phone})=>{
      const contacts = await listContacts();
      const index = contacts.findIndex(item => item.id === id);
      if(index === -1){
          return null;
}
      contacts[index] = {id, name, phone, email};
      await updateContacts(contacts);
      return contacts[index];
  }

export default  {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactById,
  };
