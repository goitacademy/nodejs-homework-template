const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

// const getAll = async () => {
//     const data = await fs.readFile(contactsPath);
//     return JSON.parse(data);
// }

const getById = async(id) => {
    const contacts = await listContacts();
    console.log('contacts', id, contacts)
    const result = contacts.find(contact => contact.id === id);
    return result || null;
}

const removeById = async(id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}

const add = async(data) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

const updateById = async (id, body) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if(index === -1) {
        return null;
    }
    contacts[index] = {id, ...body};
    await updateContacts(contacts);
    return contacts[index];
}

module.exports = {
    listContacts,
    getById,
    add,
    updateById,
    removeById,
}