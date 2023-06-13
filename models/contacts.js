const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "contacts.json");

async function getContacts() {
  try{
    const allContacts = await fs.readFile(contactsPath);
    return JSON.parse(allContacts);
  }
  catch(error){
    return null;
  }
  };
  
async function getContactById(contactId) {
  try{
    const allContacts = await getContacts();
    const oneContact = allContacts.find((contact) => contact.id === contactId);
    return oneContact || null ;
  }
  catch(error){
    return null;
  }
  };

  const removeContact = async (contactId) => {
    try {
      const contacts = await getContacts();
      const index = contacts.findIndex((item) => item.id === contactId);
      if (index === -1) {
        return null;
      }
      const [result] = contacts.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return result;
    } catch (error) {
      return null;
    }
  };
    
  
  async function addContact(body) {
    try{
    const allContacts = await getContacts();
    const newContact = { id: nanoid(), ...body };
    allContacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
    }
    catch (error) {
      return null;
    }
  };

  const updateContact = async (contactId, body) => {
    try {
      const contacts = await getContacts();
      const index = contacts.findIndex((item) => item.id === contactId);
      if (index === -1) {
        return null;
      }
      contacts[index] = {
        id: contactId,
        name:
          body.name !== undefined && body.name.trim().length > 0
            ? body.name
            : contacts[index].name,
        email:
          body.email !== undefined && body.email.trim().length > 0
            ? body.email
            : contacts[index].email,
        phone:
          body.phone !== undefined && body.phone.trim().length > 0
            ? body.phone
            : contacts[index].phone,
      };
  
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return contacts[index];
    } catch (error) {
      return null;
    }
  };

module.exports = {
    getContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}
