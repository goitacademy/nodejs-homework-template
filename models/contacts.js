const fs = require('fs/promises')
const path = require('path');
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, '../models/contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
      return contacts;
      
     }
    catch (error) {
        console.log(error.message);
    }
}



async function getContactById(contactId) {
     try {
        const contacts = await listContacts();
        const id = contacts.find(contact => contact.id === contactId);
        if(!id){
            return null;
        }
        return id;
    } catch (error) {
        console.log(error.message);
    }
}

async function removeContact(contactId) {
     try {
        const contacts = await listContacts();
        const index = contacts.findIndex(contact => contact.id === contactId);
        
        if(index === -1){
            return null;
        }

        const [result] = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts,null,2));
        return result;
    } catch (error) {
        console.log(error.message);
    }
 
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const NewContact = {
        id:v4(),
        name:name,
        email:email,
        phone:phone
        }
        contacts.push(NewContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts,null,2));
        return NewContact
    }
    catch (error) {
        console.log(error);
    }

}

const updateByContactId = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateByContactId,
}