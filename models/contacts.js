const fs = require("fs").promises;
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const dataString = await fs.readFile(contactsPath, "utf8");
  const data = JSON.parse(dataString);
  return data;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const contact = await getContactById(contactId);

  if (!contact) {
    console.log(`Contact id: "${contactId}" is not exist`);
    return null;
  } else {
    const newContacts = allContacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(`Contact "${contact.name}" is deleted`);
    return contact;
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = {
    id: uuid.v4(),
    name: name,
    email: email,
    phone: phone,
  };
  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  console.log(`Contact "${name}" is added`);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex !== -1) {
    allContacts[contactIndex].name = name;
    allContacts[contactIndex].email = email;
    allContacts[contactIndex].phone = phone;
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    console.log(`Contact "${name}" is updated`);
    return allContacts[contactIndex];
  } else {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
