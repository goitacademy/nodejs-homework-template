const fs = require("fs/promises");
const path = require("path");
const {v4} = require("uuid");
const listContacts = require("./listContacts");
const contactsPath = path.join(__dirname, "contacts.json");


async function addContact({name, email, phone}) {
    const contacts = await listContacts();
    const newContact = {"name": name, "email": email, "phone": phone, "id": v4()};
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(newContact);
    return newContact;
}

module.exports = addContact;