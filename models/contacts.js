const fs = require('fs/promises')
const path = require('path');

const {v4} = require('uuid');
const contactsPath = path.resolve(__dirname, 'contacts.json');


const listContacts = async () => {
    const data = await fs.readFile(contactsPath);

    return JSON.parse(data);
}


const getById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const result = contacts.filter(contact => contact.id === contactId); // find возвращает первый успешно найденный обект  //filter создаёт новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции

        if (result.length === 0) {
            return null;
        }
        return result[0];
    } catch (error) {
        console.log(error.message);
    }
};


const addContact = async (body) => {
    try {

        const contacts = await listContacts();
        const newContact = {...body, id: v4()}
        contacts.push(newContact);

        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return newContact;

    } catch (error) {
        console.log(error.message);
    }
}
const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
        return null;
    }

    contacts[idx] = {...body, contactId};
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[idx];
}


const removeContact = async (contactId) => {
    const contacts = await listContacts();

    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    const [removeContact] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return  removeContact;

}


module.exports = {
    listContacts,
    getById,
    removeContact,
    addContact,
    updateContact,
}
