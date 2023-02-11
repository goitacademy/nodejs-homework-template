const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require('nanoid');

const metodPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
    const contacts = await fs.readFile(metodPath, 'utf-8')
    const contactsList = JSON.parse(contacts);
    return contactsList;
}
const getContactById = async (contactId) => {
    const list = await listContacts();  
    const contact = list.find(({ id }) => id === contactId);

    if (!contact) {
        return null;
    }
    return contact;
}

async function writeFile(data) {
    const contacts = await fs.writeFile(metodPath, JSON.stringify(data, null, '\t'));
    return contacts;
}


const removeContact = async (contactId) => {
    const list = await listContacts();
    const contact = list.filter(({ id }) => id !== contactId)
    if (!contact) {
        return null;
    }
    writeFile([...contact]);
    return `contact deleted`;

}

const addContact = async (body) => {
    const list = await listContacts();
    const id = nanoid();
    const newContact = { id, ...body };
    const data = JSON.stringify([newContact, ...list]);
    await fs.writeFile(metodPath, data);
    return newContact;
};

const updateContact = async (contactId, body) => {
    const list = await listContacts();
    const index = list.findIndex(({ id }) => id === contactId);
    if (index === -1) {
        return null;
    }
    list[index] = { id: contactId, ...body };
    await fs.writeFile(metodPath, JSON.stringify(list));
    return list[index];
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}