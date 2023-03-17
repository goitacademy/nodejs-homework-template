const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");


const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
}

const addContact = async(body) => {
  const contacts = await listContacts();
  const newContact = {
          id: nanoid(),
            ...body,
        }
  contacts.push(newContact);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    return { error };
  }
};


const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(
      (contact) => contact.id === contactId.toString()
    );
  
    if (idx === -1) {
      return null;
    }
    const prevContact = await getContactById(contactId);
    const updatedContact = { ...prevContact, ...body };
   
  
    contacts.splice(idx, 1, updatedContact);
  
    try {
      await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
      return updatedContact;
    } catch (error) {
      return { error };
    }
  };
  

const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

module.exports = {
   listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

// XH53-bcvknNeK_U