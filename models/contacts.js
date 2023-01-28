const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
      const contacts = await fs.readFile(contactsPath, 'utf8');
      return JSON.parse(contacts);
    }catch(error){
      console.log(error.message);
    }

}
 
const getContactById = async (contactId) => {
    try{
      const contacts = await listContacts();
      const contact = contacts.find((contact) =>  (Number(contact.id) === Number(contactId)));
      return contact;
    }catch(error){
      console.log(error.message);
    }

}

const removeContact = async (contactId) => {
  try{
    const contacts = await listContacts();
    const deletedContact = await getContactById(contactId)
    const  newContacts = contacts.filter((contact) => Number(contact.id) !== Number(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(newContacts), 'utf8');
    return deletedContact;

  }catch(error){
    console.log(error.message);
  }
}

const addContact = async ({name, email, phone}) => {
  try{
    const contacts = await listContacts();
        const  addContact = {
         id: (contacts.length + 1).toString(),
          name,
          email,
          phone
        };
        contacts.push(addContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8');
        return addContact;
  }catch(error){
    console.log(error.message);
  }
  
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => Number(contact.id) === Number(contactId))
  contacts[index] = {...contacts[index], ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
