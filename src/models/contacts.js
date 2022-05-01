const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(
      (contact) => contact.id === String(contactId)
    );
    return contactById;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter((obj) => obj.id !== String(contactId));
    return fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();

    const nextIdNumber = Number(contacts[contacts.length - 1].id) + 1;
    
    const newContact = {
      id: String(nextIdNumber),
      name: name,
      email: email,
      phone: phone,
    };

    contacts.push(newContact);
    
    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) throw err;
    });
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const { name, email, phone } = body;
    const contactsNew = [];
    let updateContactItem = {};

    contacts.forEach((contact) => {
      if (contact.id === String(contactId)) {
        if (name) {
          contact.name = name;
        }
        if (email) {
          contact.email = email;
        }
        if (phone) {
          contact.phone = phone;
        }
        updateContactItem = contact;
      }
      contactsNew.push(contact);
    });
    fs.writeFile(contactsPath, JSON.stringify(contactsNew), (err) => {
      if (err) throw err;
    });
    return updateContactItem;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
