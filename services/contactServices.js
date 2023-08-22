const { randomUUID } = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const contactPath = path.join(process.cwd(), "models", "contact.json")

const listContactsService = async () => {
    const jsonData = await fs.readFile(contactPath, "utf-8");
    return JSON.parse(jsonData);
}
const getContactByIdService = async () => {
    const contacts = await listContactsService();
    const contact = contacts.find(({ id }) => contactID === id);
    if (!contact) {
        throw new Error("This contact does not exist")
    }
    return contact;
};

const removeContactService = async (body) => {
    const contacts = await listContactsService();
    const newContact = { ...body, id: randomUUID() };
    contacts.push(newContact);
    await fs.writeFile(taskPatch, JSON.stringify(contacts, null, 2));
    return newContact;
};

const addContactService = async (contactID) => {
    const contacts = await listContactsService();
    const contactIndex = contacts.fiindIndex(({ id }) => contactID === id);
    if (contactIndex === -1) {
        throw new Error("This contact does not exist")
    }
    contacts.splice(contactIndex, 1);
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return contactID;
};

const updateContactService = async (contactID, body) => {
    const contacts = await listContactsService();
    const contactIndex = contacts.fiindIndex(({ id }) => contactID === id);
    if (contactIndex === -1) {
        throw newError('This contact does not exist');
    }
    contacts[contactIndex] = { ...contact[contactIndex], ...body };
    await fs.writeFile(contactPath, JSON.stringify(contact, null, 2));
    return contact[contactIndex];
};


module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
}