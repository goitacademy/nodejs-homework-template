
const { v4 } = require("uuid")
const path = require("path")
const fs = require("fs").promises

const contactsPath = path.join(__dirname, "contacts.json");

async function updateContacts (contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
}

  async function listContacts ()  {
        try{const data = await fs.readFile(contactsPath);
         return JSON.parse(data);
        } catch(error) {
          throw error;
         };
    };
    
  async function  getContactById (contactId) {

       try {
        const contacts = await listContacts();
        const reply = contacts.find((item) => item.id === contactId)


        return reply
       } catch (error) {
        throw error;
       };
    };
    
    async function removeContact(contactId) {

      try {
        const contacts = await listContacts();
        const newContacts = contacts.filter((item) => item.id !==contactId || Number(item.id) !== Number(contactId) );

        const reply = JSON.stringify(newContacts);
        await fs.writeFile(contactsPath, reply);
        return newContacts;

      } catch (error){
        throw error;
      };
    };
    
    async function addContact(name, email, phone) {
      try {

        function getRandom() {
          return Math.random();
        }


        const newContact = {
          id: "",
          name,
          email,
          phone,
        };

        const contacts = await listContacts();
        const {length} = contacts;
        const lastId = contacts[length - 1].id;
        newContact.id = String( Number(lastId) + 1);
        const newContacts = [...contacts, newContact];
        const reply = JSON.stringify(newContacts, null, 2);
        await fs.writeFile(contactsPath, reply);
        return newContact

        

      } catch (error) {
        throw error;
      };
    };


    async function updateContactById (id, name, email, phone) {
      const contacts = await listContacts()
      const idx = contacts.findIndex(item => item.id == id)
      if (idx === -1) {
        return null
      }
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
