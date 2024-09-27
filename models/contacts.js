const { nanoid } = require("nanoid");
const fsPromises = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  return await fsPromises
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      return contacts;
    })
    .catch((error) => {
      console.error("Помилка при зчитуванні файлу:", error);
      throw error;
    });
};

const getContactById = async (contactId) => {
  return await fsPromises
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.find((item) => item.id === contactId);
      return contact || null;
    })
    .catch((error) => {
      console.error("Помилка при зчитуванні файлу:", error);
      throw error;
    });
};

const removeContact = async (contactId) => {
  return fsPromises
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const index = contacts.findIndex((item) => item.id === contactId);
      if (index !== -1) {
        const deletedContact = contacts.splice(index, 1)[0];
        return fsPromises
          .writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8")
          .then(() => deletedContact);
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error("Помилка при зчитуванні файлу:", error);
      throw error;
    });
};

const addContact = async (body) => {
  return fsPromises
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContact = {
        id: nanoid(),
        name: body.name,
        email: body.email,
        phone: body.phone,
      };
      contacts.push(newContact);
      return fsPromises
        .writeFile(contactsPath, JSON.stringify(contacts), "utf-8")
        .then(() => newContact);
    })

    .catch((error) => {
      console.error("Помилка при зчитуванні/запису файлу:", error);
      throw error;
    });
};

const updateContact = async (contactId, body) => {
  return fsPromises
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const index = contacts.findIndex((item) => item.id === contactId);

      if (index !== -1) {
        const updatedContact = { ...contacts[index], ...body };
        contacts[index] = updatedContact;

        return fsPromises
          .writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8")
          .then(() => updatedContact);
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error("Помилка при зчитуванні файлу:", error);
      throw error;
    });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
