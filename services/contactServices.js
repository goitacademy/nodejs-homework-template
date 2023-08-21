const { randomUUID } = require('crypto');
const fs = require('fs/promises');
const path = require('path');
const contactPath = path.join(__dirname, '..', 'db', 'contacts.json');

const getAllContactsService = async () => {
    const jsonData = await fs.readFile(contactPath, 'utf-8');
    return JSON.parse(jsonData);
};

const getOneContactService = async (contactID) => {
    try {
        const contacts = await getAllContactsService();
        const contact = contacts.find(({ id }) => contactID === id);
        if (!contact) {
            throw new Error('This contact does not exist');
        }
        return contact;
    } catch (error) {
        console.error('Error in getOneContactService:', error); 
        throw error; 
    }
};

const postContactService = async (body) => {
    const contacts = await getAllContactsService();
    const newContact = {
        ...body,
        id: randomUUID(),
    };
    contacts.push(newContact);
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return newContact;
};

const deleteContactService = async (contactID) => {
    const contacts = await getAllContactsService();
    const contactIndex = contacts.findIndex(({ id }) => contactID === id);
    if (contactIndex === -1) {
        throw new Error('This contact does not exist');
    }
    contacts.splice(contactIndex, 1);
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return contactID;
};

const putContactService = async (contactID, body) => {
    const contacts = await getAllContactsService();
    const contactIndex = contacts.findIndex(({ id }) => contactID === id);
    if (contactIndex === -1) {
        throw new Error('This contact does not exist');
    }
    contacts[contactIndex] = {
        ...contacts[contactIndex],
        ...body,
    };
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return contacts[contactIndex];
};

module.exports = {
    getAllContactsService,
    getOneContactService,
    postContactService,
    deleteContactService,
    putContactService,
};
