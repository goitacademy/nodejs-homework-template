
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid"); 

const contactsPath = path.join(__dirname, "db/contacts.json");


const listContacts = async () => {
    // ...твій код. Повертає масив контактів.(readFile)

        const data = await fs.readFile(contactsPath , 'utf-8');
        return JSON.parse(data);
  }
  
const getContactById = async (contactId) => {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
        
        const data = await listContacts()
        const contactById = data.find(item => item.id === contactId)
        return contactById || null
  }

  const addContact = async(name, email, phone) => {
    // ...твій код. Повертає об'єкт доданого контакту. Повертає null, якщо контакт з таким id не знайдений.
        
        const data = await listContacts()
        const newContact = { 
            id: nanoid(), 
            name, 
            email, 
            phone 
        };

        data.push(newContact);
        await fs.writeFile(contactsPath , JSON.stringify(data, null, 2));
        return newContact;

}
  
const removeContact = async (contactId) => {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const data = await listContacts()
    const index = data.findIndex(item => item.id === contactId);

    if (index === -1) {
        return null;
    }

    const [removed] = data.splice(index, 1);
    await fs.writeFile(contactsPath , JSON.stringify(data, null, 2));

    return removed;

}

// const updateById = async (contactId, name, email, phone) => {
//     // ...твій код. Змінює об'єкт  контакту. Повертає null, якщо контакт з таким id не знайдений.
//     const data = await listContacts()
//     const index = data.findIndex(item => item.id === contactId);

//     if (index === -1) {
//         return null;
//     }

//     const [index] = {
//         id,
//         name,
//         email,
//         phone,
//     };
//     await fs.writeFile(contactsPath , JSON.stringify(data, null, 2));

//     return data[index];

// }

// const updateContact = async (contactId, body) => {}





  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,

    updateContact,
    updateById,
  };

// const fs = require('fs/promises')

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
