const { nanoid } = require("nanoid");
const getAllContacts = require("./getAll");
const updateContacts = require("./updateContacts");

const addContact = async (data) => {
  const contacts = await getAllContacts();
  const newContact = { ...data, id: nanoid() };
  contacts.push(newContact);

  await updateContacts(contacts);
  return newContact;
};
module.exports = addContact;

// import contactsOperations from "./index.js";
// import { nanoid } from "nanoid";

// const addContact = async (data) => {
//   const contacts = await contactsOperations.getAllContacts();
//   const newContact = { ...data, id: nanoid() };
//   contacts.push(newContact);

//   await contactsOperations.updateContacts(contacts);
//   return newContact;
// };

// export default addContact;
