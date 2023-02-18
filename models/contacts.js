const fs = require('fs').promises;
const path = require('path')
const uuid = require('uuid');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
try {
    const dataString = await fs.readFile(contactsPath, 'utf8');
    const data = JSON.parse(dataString);
    return data;
} catch (error) {
    console.log(error)
}
}

const getContactById = async (contactId) => {
try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId);
    return result || null;
} catch (error) {
    console.log(error)
}
}

const removeContact = async (contactId) => {
    try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    await fs.writeFile(
        contactsPath,
        JSON.stringify(data.filter((contact) => contact.id !== contactId)),
        "utf8"
    );
    console.log("contact has been removed");
    } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
    }
}

const addContact = async (body,res) => {
try {
    const contacts = await listContacts();
    const newContact = {
        id: uuid.v4(),
        ...body,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
} catch (error) {
    return res.status(500).json({ message: "Internal Error" });
}

}

const updateContact = async (contactId, body, res) => {
    try {
        const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
        const index = data.findIndex(contact => contact.id === contactId)
        if (index === -1) {
            return false;
        }
        data.splice(index, 1, { id: contactId, ...body })
        await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
        return data[index]
    } catch (error) {
        return res.status(500).json({ message: "Internal Error" });
    
    }

}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}
