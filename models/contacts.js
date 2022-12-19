const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path")

const contactsPath =  path.join(__dirname, './contacts.json') ;

const listContacts = async ()=> {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
}

const getContactById = async(id) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id );

    return result || null;
}

const addContact = async({name, email, phone}) =>{
    const contacts = await listContacts()
    const newContact = {
        id:nanoid(),
        name, 
        email,
        phone,
    }
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
    }

    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}
const putContactById = async({contactId,name, email, phone}) => {
    const contacts = await listContacts();
    const [contact] = contacts.filter(item => item.id === contactId);   
    contact.name = name;
    contact.email = email;
    contact.phone = phone;

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    
    return contact;

}


module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    putContactById
}