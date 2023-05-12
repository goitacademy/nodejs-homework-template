const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
    try {
        const allContacts = await fs.readFile(contactsPath);
        return JSON.parse(allContacts);
    } catch (error) {
        console.log(error);
    }
};

async function getContactById(contactId) {
    try {
        const allContacts = await listContacts();
        const contactById = allContacts.find(el => el.id === contactId);
        return contactById || null;
    } catch (error) {
        console.log(error);
    }
};

async function removeContact(contactId) {
    try {
        const allContacts = await listContacts();
        const contactIndex = allContacts.map(el => el.id).indexOf(contactId);
        if (contactIndex < 0) {
            return
        }
        allContacts.splice(contactIndex, 1);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
        console.log("removeContact");
        return allContacts
    } catch (error) {
        return error.message
    }
}

async function addContact(body) {
    try {
        const newId = () => {
            if (!body.id) { return Date.now() }
            return body.id
        }
        const allContacts = await listContacts();
        const newContact = {
            id: newId(),
            name: body.name,
            email: body.email,
            phone: body.phone
        };
        allContacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
        return newContact
    } catch (error) {
        console.log(error);
    }
}

async function updateContact(contactId, body) {
    try {
        const changedContact = await getContactById(contactId)
        if (!changedContact) {
            return
        }
        await removeContact(contactId)
        if(body.name){changedContact.name = body.name}
        if(body.email){changedContact.email = body.email}
        if (body.phone) { changedContact.phone = body.phone }
        await addContact(changedContact)
        return changedContact
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};