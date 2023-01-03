const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactById = contacts.filter(
      (contact) => contact.id === contactId.toString()
    );
    if (contactById.length > 0) {
      return contactById;
    }
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const deleteContact = contacts.filter((contact) => contact.id !== contactId);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(deleteContact));
    return deleteContact;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    const contactNew = {
      id: shortid.generate(),
      name,
      email: email,
      phone: phone,
    };
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactsList = [contactNew, ...contacts];
    await fs.writeFile(contactsPath, JSON.stringify(contactsList));
    return contactNew;
  } catch (err) {
    console.error(err.message);
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = listContacts();
  const contactsToChange = contacts.find((el) => el.id === contactId);

  if (!contactsToChange) {
    return null;
  }

  contactsToChange.name = name;
  contactsToChange.email = email;
  contactsToChange.phone = phone;

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contactsToChange;
};

// const updateContact = async (contactId, value) => {
//   let { name, email, phone } = value;
//   const data = await fs.readFile(contactsPath);
//   const contacts = JSON.parse(data);
//   const index = contacts.findIndex((c) => c.id === contactId);
//   if (index === -1) return null;
//   const contact = data[index];
//   name = name || contact.name;
//   email = email || contact.email;
//   phone = phone || contact.phone;
//   const newContact = { id: contactId, name, email, phone };
//   await contacts.splice(index, 1, newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts));
//   return newContact;
// };

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
