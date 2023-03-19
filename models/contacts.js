const fs = require("fs/promises");
const uuid = require("uuid").v4;
const path = require("path");

const contactsPath = path.resolve(__dirname, "contacts.json");

async function getContacts() {
  try {
    const contactsJSON = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(contactsJSON);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

const listContacts = async () => {
  try {
    const contacts = await getContacts();
    return contacts;
  } catch (err) {
    console.log(err);
  }
};

const createContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await getContacts();
    const newContact = {
      id: uuid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (err) {
    console.error(err.message);
  }
};

const recieveContactById = async (contactId) => {
  try {
    const contacts = await getContacts();

    const contact = contacts.filter(
      (item) => String(item.id) === String(contactId)
    );
    return contact;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    let contacts = await getContacts();

    contacts = contacts.filter((item) => String(item.id) !== String(contactId));

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
  } catch (err) {
    console.error(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await getContacts();
    const { name, email, phone } = body;

    contacts.forEach((contact) => {
      if (String(contact.id) === String(contactId)) {
        if (name) contact.name = name;
        if (email) contact.email = email;
        if (phone) contact.phone = phone;
      }
    });

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    const contact = contacts.filter(
      ({ id }) => String(id) === String(contactId)
    );

    if (contact.length === 0) return null;

    return contact;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  recieveContactById,
  removeContact,
  createContact,
  updateContact,
};
