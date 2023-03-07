const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  try {
    JSON.parse(await fs.readFile(contactsPath, "utf8"));
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();

    const contactById = contacts.find((el) => el.id === contactId);

    if (!contactById) {
      return console.log(`Contact with id:${contactId} not found!`);
    }

    console.log("contactById: ", contactById);

    return contactById;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();

    const filteredContacts = contacts.filter(
      (el) => el.id !== contactId.toString()
    );

    await fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts, null, 2),
      (err) => {
        if (err) console.log(err);
      }
    );

    console.log(`Contact with id:${contactId} has been removed!`);
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const { name, email, phone } = body;

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    const newContactsArr = [...contacts, newContact];

    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContactsArr, null, 2),
      (err) => {
        if (err) console.log(err);
      }
    );

    console.log(`New contact has been added!`, newContact);
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();

    const contactById = contacts.find((el) => el.id === contactId);

    if (!contactById) {
      return console.log(`Contact with id:${contactId} not found!`);
    }

    const { name, email, phone } = body;

    await contacts.forEach((contact) => {
      if (contact.id === contactId) {
        if (name) {
          contact.name = name;
        }
        if (email) {
          contact.email = email;
        }
        if (phone) {
          contact.phone = phone;
        }
      }
    });

    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      (err) => {
        if (err) console.log(err);
      }
    );

    console.log(`Contact with id:${contactId} has been updated!`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
