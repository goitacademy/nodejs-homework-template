
const path = require("path")
const fs = require("fs").promises

const contactsPath = path.join(__dirname, "contacts.json");


const listContacts = async () =>  {
  try{const data = await fs.readFile(contactsPath);
   return JSON.parse(data);
  } catch(error) {
    throw error;
   };
};
    
  const getContactById = async (contactId) => {

       try {
        const contacts = await listContacts();
        const reply = contacts.find((item) => item.id === contactId)
        return reply
       } catch (error) {
        throw error;
       };
    };

    const updateContacts = async (contacts) => {
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    }
    
    const removeContact = async(contactId) => {

      try {
        const contacts = await listContacts();
        const newContacts = contacts.filter((item) => item.id !==contactId || Number(item.id) !== Number(contactId) );

        updateContacts(newContacts)
        return newContacts;

      } catch (error){
        throw error;
      };
    };

    const addContact = async ({ name, email, phone }) => {
      const contacts = await listContacts();
      const newContact = {
        id: '',
        name,
        email,
        phone,
      };


      const {length} = contacts;
      const lastId = contacts[length - 1].id;
      newContact.id = String( Number(lastId) + 1);
      contacts.push(newContact);
      await updateContacts(contacts);
      return newContact;
    };


    const updateContactById = async (id, { name, email, phone }) => {
      const contacts = await listContacts()
      const idx = contacts.findIndex(item => item.id == id)
      if (idx === -1) {
        return null
      }
      id = String(id)
      contacts[idx] = { id, name, email, phone }
      await updateContacts(contacts)
      return contacts[idx]
    }
    
    module.exports = {
      listContacts,
      getContactById,
      removeContact,
      addContact,
      updateContactById,
    }

    
