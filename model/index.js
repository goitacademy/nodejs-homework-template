const fs = require("fs").promises;
const contactsPath = require("./contacts.json");
const shortid = require("shortid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  if (!contacts || contacts.length === 0) {
    console.log("Contacts list is empty");
    return;
  }
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(({ id }) => id === contactId);
  if (!contactById) {
    console.log("There is no such contact");
    return;
  }
  return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const newListOfContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  const content = JSON.stringify(newListOfContacts);
  fs.writeFile(contactsPath, content);
  return newListOfContacts;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  if (name || email || phone) {
    const contacts = await listContacts();
    const newContact = {
      id: shortid.generate(),
      name: name,
      email: email,
      phone: phone,
    };
    const newListOfContacts = [...contacts, newContact];
    const content = JSON.stringify(newListOfContacts);
    console.log(newListOfContacts);
    fs.writeFile(contactsPath, content);
    return newListOfContacts;
  }
  console.log("All required fields are empty!");
  return;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  contacts.forEach((contact) => {
    if (contact.id === body.id) {
      contact = {
        id: contactId,
        name: body.name,
        email: body.email,
        phone: body.phone,
      };
    }
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
