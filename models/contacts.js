const fs = require("fs/promises");

const listContacts = async () => {
  return await fs.readFile(`${__dirname}/contacts.json`, "utf-8");
};

const getContactById = async (contactId) => {
  const db = await fs
    .readFile(`${__dirname}/contacts.json`, "utf-8")
    .then((data) => data)
    .catch((err) => console.log(err));
  const getById = JSON.parse(db).filter((item) => item.id === contactId);
  return getById;
};

const removeContact = async (contactId) => {
  const db = await fs
    .readFile(`${__dirname}/contacts.json`, "utf8")
    .then((data) => data)
    .catch((err) => err);
  const newArr = JSON.parse(db).filter((item) => item.id !== contactId);
  fs.writeFile(`${__dirname}/contacts.json`, JSON.stringify(newArr));
  return contactId;
};

const addContact = async (body) => {
  const result = await fs
    .readFile(`${__dirname}/contacts.json`, "utf8")
    .then((data) => data)
    .catch((err) => err);
  const newContact = {
    id: Math.random().toString(),
    name: body.name,
    email: body.phone,
    phone: body.email,
  };
  const arr = JSON.parse(result);
  arr.push(newContact);
  fs.writeFile(`${__dirname}/contacts.json`, JSON.stringify(arr));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const result = await fs
    .readFile(`${__dirname}/contacts.json`, "utf8")
    .then((data) => JSON.parse(data))
    .catch((err) => err);

  const contact = result.find((contact) => {
    if (contact.id === contactId) {
      contact.name = body.name;
      contact.email = body.email;
      contact.phone = body.phone;
      return contact;
    }
  });
  fs.writeFile(`${__dirname}/contacts.json`, JSON.stringify(result));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
