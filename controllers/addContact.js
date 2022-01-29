const fs = require("fs/promises");
const short = require('short-uuid');

const getContacts = require("./getContacts.js");

const addContact = async (pathToDB, name, email, phone) => {
    const contactList = await getContacts(pathToDB);
    const contactName = name.toString();
    const contactEmail = email.toString();
    const contactPhone = phone.toString();
    const newContact = {
            id: short.generate(),
            name: contactName,
            email: contactEmail,
            phone: contactPhone
        }

    contactList.push(newContact);
    await fs.writeFile(pathToDB, JSON.stringify(contactList));

    return newContact;
}

module.exports = addContact;
