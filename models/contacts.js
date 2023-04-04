const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("db", "contacts.json");
const  {nanoid}  = require("nanoid");

const listContacts = async () => {
    try {
        const contacts = await fs.readFile(contactsPath, "utf8", (e, d) => {
          if (e) {
            console.log("error", e);
          }
          console.log("data", d);
        });
        return JSON.parse(contacts);
      } catch {
        return (error) => console.log(error);
      }
}
listContacts();
const getContactById = async (contactId) => {try {
    const contacts = await listContacts();
    const contactById = contacts.find((contact) => contact.id === contactId);
    return contactById || null;
  } catch {
    return (error) => console.log(error);
  }}

const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const deleteContact = contacts.findIndex((contact) => contact.id === contactId);
          console.log('Contact deleted succefull',contacts[deleteContact])
          contacts.splice(deleteContact, 1);
          await fs.writeFile(contactsPath,JSON.stringify(contacts,null,2));
          return contacts;
       
      
       
      } catch {
        return (error) => console.log(error);
      }
}

const addContact = async ({name,email,phone}) => {
  try {
        const contacts = await listContacts();
        const newContact = {
          id: nanoid(),
          name,
          email,
          phone,
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath,JSON.stringify(contacts,null,2))
        return newContact;
      } catch {
        return (error) => console.log(error);
      }
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
