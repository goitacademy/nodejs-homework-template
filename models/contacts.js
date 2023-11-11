const fs = require("node:fs/promises");
const path = require("node:path");
const contactsPath = path.join(__dirname, "contacts.json");
const { v4: uuidv4 } = require("uuid");

// console.log(contactsPath);

class Contacts {
  constructor(path) {
    this.path = path;
  }
  read = async () => {
    const contacts = await fs.readFile(this.path, "utf-8");
    // console.log(typeof contacts)
    return JSON.parse(contacts); // якщо return contacts то повертає String, тому повертаємо JSON.parse
  };

  write = async (data) => {
    const result = await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    return result;
  };

  listContacts = async () => {
    const data = await this.read();
    // console.log(data);
    return data;
  };

  addContact = async (contact) => {
    const contacts = await this.read();
    const newContact = {
      id: uuidv4(),
      ...contact,
    };

    contacts.push(newContact);

    return await this.write(contacts);
  };

  updateContact = async (contactId, body) => {
    const contacts = await this.read();
    const idx = contacts.findIndex(item => item.id === contactId);
    // console.log(idx);

    if (idx === -1) {
      // console.log("Not found")
      return null;
    }
    contacts[idx] = { id: contactId, ...body }
    return await this.write(contacts);
  };

  removeContact = async (contactId, body) => {
    const contacts = await this.read();
    const idx = contacts.findIndex(item => item.id === contactId);
    // console.log(idx);

    if (idx === -1) {
      // console.log("Not found")
      return null;
    }
    contacts[idx] = { id: contactId, ...body }
    return await this.write(contacts);
  };
}
const contacts = new Contacts(contactsPath);
// contacts.read();
// contacts.listContacts();
// contacts.addContact({
//   "name": "Katherine Kortis",
//   "email": "kor.in@egetlacus.ca",
//   "phone": "(294) 840-8888"
// });

/* contacts.updateContact("d9f1af39-c756-4497-bfda-38efb24dbf75", {
    name: "Katherine Kortchenko",
    email: "kor.ko@egetlacus.ca",
    phone: "(294) 840-7777",
  },
  ); */
  // contacts.updateContact(1, {
  //   name: "Katherine Kortchenko",
  //   email: "kor.ko@egetlacus.ca",
  //   phone: "(294) 840-7777",
  // },
  // );

// const listContacts = async () => {};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

// const addContact = async (body) => {};

// const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
