const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    return fs.readFile(contactsPath, "utf-8").then((data) => {
      const contacts = JSON.parse(data);
      return contacts;
    });
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    return fs.readFile(contactsPath, "utf-8").then((data) => {
      const contacts = JSON.parse(data).filter((elem) => elem.id === contactId);
      return contacts;
    });
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contactToDel = contacts.find((elem) => elem.id === contactId);
    if (!contactToDel) {
      return null;
    }
    contacts.splice(contacts.indexOf(contactToDel), 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contactToDel;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    if (!body && contactId) {
      return null;
    }
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contactToEdit = contacts.find((elem) => elem.id === contactId);
    const editedContact = contactToEdit;
    if (body.name) {
      editedContact.name = body.name;
    } else if (body.email) {
      editedContact.email = body.email;
    } else if (body.phone) {
      editedContact.phone = body.phone;
    } else {
      return null;
    }

    contacts.splice(contacts.indexOf(contactToEdit), 1, editedContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return editedContact;
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
