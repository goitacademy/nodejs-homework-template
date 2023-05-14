const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");


const contactsPath = path.join(__dirname, 'contacts.json');

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getContactById = async (id) => {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === id);
    return result || null;
}

const removeContact = async (id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if (index === -1) {
        return null;
    }
    const [res] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return res;
};

const addContact = async (data) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
};

const updateContactById = async (id, data) => {
    const movies = await listContacts();
    const index = movies.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    movies[index] = {id, ...data};
    await updateContacts(movies);
    return movies[index];
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContactById
};