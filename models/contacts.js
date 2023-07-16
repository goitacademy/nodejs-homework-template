const {nanoid} = require('nanoid');
const fs = require('fs/promises');
const path = require('path');


const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
   const contacts = JSON.parse(data);
   return contacts;
}

const getContactById = async (contactId) => {
      const contacts = await listContacts();
      const contact = contacts.find((item) => item.id === contactId.toString());
      return contact || null;

}


const  addContact = async (data) => {
  const contactsList = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data
  }
 
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2))
  return newContact;
}

const removeContact = async (contactId) => {
  // ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
  try {
    const contactsList = await listContacts();
    const contactIdx = contactsList.findIndex(contact => contact.id === contactId.toString());
    if(contactIdx === -1){
      return null;
    }
    const[removeContact] = contactsList.splice(contactIdx, 1)
    fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2))
    return removeContact;
  } catch (error) {
    console.log(error.massage)
  }

}

const updateContact = async (id, body) => {
  const contactsList = await listContacts();
  const idx = contactsList.findIndex(contact => contact.id === id.toString());
  if(idx === -1){
    return null;
  }
  
contactsList[idx] = {id, ...body};

fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2))

return contactsList[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
