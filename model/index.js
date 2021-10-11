const handleError = require("../lib/hanleerror");
const path = require("path");
const fs = require("fs/promises");
const { v4: uuid } = require("uuid");

const contacts = path.resolve("model/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contacts, "utf8");
  const users = JSON.parse(data);
  return users;
};

const getContactById = async (contactId) => {
  try {
    const users = await listContacts();
    const filteredContact = users.filter(
      (contact) => contact.id.toString() === contactId
    );
    return filteredContact;
  } catch (error) {
    handleError(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const users = await listContacts();
    const removedContact = users.filter(
      (contact) => contact.id.toString() === contactId
    );

    const deletedContact = users.filter(
      (contact) => contact.id.toString() !== contactId
    );

    await fs.writeFile(contacts, JSON.stringify(deletedContact, null, 2));
    return removedContact;
  } catch (error) {
    handleError(error);
  }
};

const addContact = async (body) => {
  try {
    const users = await listContacts();

    const item = { id: uuid(), ...body };
    const addNewContact = [...users, item];

    await fs.writeFile(contacts, JSON.stringify(addNewContact, null, 2));
    return item;
  } catch (error) {
    handleError(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const users = await listContacts();
    const findContact = users.find(
      (contact) => contact.id.toString() === contactId
    );

    if (!findContact) {
      return;
    }
    const updatedContact = { ...findContact, ...body };

    const changeContact = users.map((contact) => {
      if (contact.id === contactId) {
        return updatedContact;
      }
      return contact;
    });

    await fs.writeFile(contacts, JSON.stringify(changeContact, null, 2));
    return updateContact;
  } catch (error) {
    handleError(error);
  }
};

const Contact = require("./schemas/contact");

const listContacts = async () => {
  const results = await Contact.find({});
  return results;
};

const getContactById = async (id) => {
  const result = await Contact.findOne({ _id: id });
  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (id, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );
  return result;
};

const removeContact = async (id) => {
  const result = await Contact.findByIdAndRemove({
    _id: id,
  });
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
