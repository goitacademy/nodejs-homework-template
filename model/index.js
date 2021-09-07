const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.join("./model/contacts.json");

const getListContact = () => {
  return fs.readFile(contactsPath, "utf8");
};
const writeToJson = (data) => {
  return fs.writeFile(contactsPath, data);
};

const listContacts = async () => {
  try {
    const listContact = await getListContact();
    return JSON.parse(listContact);
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const listContact = await getListContact();
    const contact = JSON.parse(listContact);
    const contactById = contact.find(({ id }) => id.toString() === contactId);
    return contactById;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const listContact = await getListContact();
    const contact = JSON.parse(listContact);
    const idDeleteList = contact.filter(
      ({ id }) => id.toString() !== contactId
    );
    const contactsList = JSON.stringify(idDeleteList);
    await writeToJson(contactsList);
    return idDeleteList;
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const listContact = await getListContact();
    const contact = JSON.parse(listContact);
    const contactNew = { id: shortid.generate(), name, email, phone };
    const contactsList = JSON.stringify([contactNew, ...contact], null, "\t");

    await writeToJson(contactsList);
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (contactId, name, email, phone) => {
  console.log(contactId, name, email, phone);
  try {
    const listContact = await fs.readFile(contactsPath, "utf8");
    const contact = JSON.parse(listContact);
    contact.forEach((cont, index) => {
      if (cont.id.toString() === contactId) {
        return { id: contactId, name, email, phone };
      }
      console.log(contactsList);
      return contact;
    });

    const contactsList = JSON.stringify(contact, null, "\t");
    await writeToJson(contactsList);
  } catch (err) {
    console.log(err.message);
  }
};

const changeContact = async (contactId, name, email, phone) => {
  console.log(contactId, name, email, phone);
  try {
    const listContact = await getListContact();
    const contact = JSON.parse(listContact);
    contact.map((cont) => {
      if (cont.id.toString() === contactId) {
        if (name) {
          cont.name = name;
        }
        if (email) {
          cont.email = email;
        }
        if (phone) {
          cont.phone = phone;
        }
      }
      return cont;
    });
    const contactsList = JSON.stringify(contact, null, "\t");
    await writeToJson(contactsList);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  changeContact,
};
