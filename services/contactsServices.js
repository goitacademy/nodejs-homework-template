const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("./db", "contacts.json");

const listContactsDB = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.log(err.message);
  }
};

const getByIdDB = async (contactId) => {
  const contacts = await listContactsDB();

  const contact = contacts.find((item) => item.id === contactId);

  return contact;
};

const addContactDB = async ({ name, email, phone }) => {
  try {
    const contacts = await listContactsDB();
    contacts.push({ id: new Date().getTime().toString(), name, email, phone });
    const newContacts = JSON.stringify(contacts, null, " ");

    await fs.writeFile(contactsPath, newContacts, "utf8", (err) => {
      if (err) throw err;
    });
  } catch (err) {
    console.log(err.message);
  }
};

const removeContactDB = async (contactId) => {
  try {
    const contacts = await listContactsDB();
    const newContacts = JSON.stringify(
      contacts.filter((contact) => contactId !== contact.id),
      null,
      " "
    );

    await fs.writeFile(contactsPath, newContacts, "utf8", (err) => {
      if (err) throw err;
    });
  } catch (err) {
    console.log(err.message);
  }
};

const updateContactDB = async ({ name, email, phone, contactId }) => {
  try {
    const contacts = await listContactsDB();

    contacts.forEach((contact) => {
      if (Number(contact.id) === Number(contactId)) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
      }
    });

    const newContacts = JSON.stringify(contacts, null, " ");

    await fs.writeFile(contactsPath, newContacts, "utf8", (err) => {
      if (err) throw err;
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContactsDB,
  getByIdDB,
  addContactDB,
  removeContactDB,
  updateContactDB,
};
