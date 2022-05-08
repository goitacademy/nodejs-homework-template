const fs = require("fs/promises");
const path = require("path");
const {v4} = require("uuid");
const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts () {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
};

async function getContactById (id) {
    const contacts = await listContacts();
    const contactById = contacts.find(el => el.id === id.toString());
    console.log(contactById);
    if(!contactById) {
        throw new Error(`No contact with id ${id}`);
    }
    return contactById;
};

async function removeContact(id) {
    const contacts = await listContacts();
    const contactToRemove = contacts.find(el => el.id === id.toString());
    const newContacts = contacts.filter(el => el.id !== id.toString());
    console.log(contactToRemove);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.table(newContacts);
    return contacts[contactToRemove];
}

async function addContact({name, email, phone}) {
    const contacts = await listContacts();
    const newContact = {"name": name, "email": email, "phone": phone, "id": v4()};
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(newContact);
    console.table(contacts);
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};

