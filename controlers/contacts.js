const Contact = require("../models/contacts/contact");
// const {
//     HttpError
// } = require("../helpers");

const getAll = async () => {
  const data = await Contact.find();
  console.log(data);
  return data;
};
const getContactById = async (id) => {
  const contacts = await getAll();
  return contacts.find((contact) => contact.id === id) || null;
};

const deleteContact = async (req) => {
  const contactId = String();
  const contacts = await getAll();
  console.log(contacts);
  const index = contacts.findIndex((item) => item.id === contactId);
  console.log(index);

  if (index === -1) {
    console.log("before");
    return null;
  }
  console.log("after");
  const [result] = contacts.splice(index, 1);

  return result;
};

const addContact = async (body) => {
  const contacts = await getAll();
  const { name, email, phone, favorite } = body;
  const newContact = { name, email, phone, favorite };
  contacts.push(newContact);
  return newContact;
};
const updateContact = async (id, data) => {
  const contacts = await getAll();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  return contacts[index];
};
module.exports = {
  getContactById,
  addContact,
  updateContact,
  getAll,
  deleteContact,
};
