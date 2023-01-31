const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  try {
    const list = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(list);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactList = await listContacts();
    const [contactById] = contactList.filter((el) => {
      return el.id === contactId;
    });
    return contactById;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactList = await listContacts();
    const contact = contactList.some((el) => el.id === contactId);
    if (!contact) {
      return false;
    }
    const removeById = contactList.filter((el) => {
      return el.id !== contactId;
    });
    await fs.writeFile(contactsPath, JSON.stringify(removeById));
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contactList = await listContacts();
    contactList.push({
      id: JSON.stringify(Math.floor(Math.random() * 100 + 1)),
      name,
      email,
      phone,
    });

    await fs.writeFile(contactsPath, JSON.stringify(contactList));
    return contactList;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  try {
    const contactList = await listContacts();
    const contact = contactList.find((el) => el.id === contactId);

    if (!contact) {
      return null;
    }
    contactList.forEach((el) => {
      if (el.id === contactId) {
        if (name) {
          el.name = name;
        }
        if (email) {
          el.email = email;
        }
        if (phone) {
          el.phone = phone;
        }
      }
    });
    await fs.writeFile(contactsPath, JSON.stringify(contactList));
    return contactList;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
