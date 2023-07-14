
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid"); 

const contactsPath = path.join(__dirname, "../models/contacts.json");


const listContacts = async () => {
    // ...твій код. Повертає масив контактів.(readFile)

        const data = await fs.readFile(contactsPath , 'utf-8');
        return JSON.parse(data);
  }
  
const getById = async (id) => {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
        
        const data = await listContacts()
        const contactById = data.find(item => item.id === id)
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
  
const removeContact = async (id) => {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const data = await listContacts()
    const index = data.findIndex(item => item.id === id);

    if (index === -1) {
        return null;
    }

    const [removed] = data.splice(index, 1);
    await fs.writeFile(contactsPath , JSON.stringify(data, null, 2));

    return removed;

}

const updateContact  = async (id, name, email, phone) => {
    // ...твій код. Змінює об'єкт  контакту. Повертає null, якщо контакт з таким id не знайдений.
    const data = await listContacts()
    const index = data.findIndex(item => item.id === id);

    if (index === -1) {
        return null;
    }

    data [index] = {
        id,
        name,
        email,
        phone,
    };
    await fs.writeFile(contactsPath , JSON.stringify(data, null, 2));

    return data[index];

}

  module.exports = {
    listContacts,
    getById,
    removeContact,
    addContact,
    updateContact,
  };

