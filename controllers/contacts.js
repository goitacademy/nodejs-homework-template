const fs = require("fs").promises;
// const { Contact } = require("./contact.js");

const path = require("path");
const contactsPath = path.resolve("models/contacts.json");

// wyswietla kontakty uzytkownikow
const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

// szuka po ID
const getContactById = async (id) => {
  const data = await fs.readFile(contactsPath);
  const parseData = JSON.parse(data);
  return parseData.find((contact) => contact.id === id);
};

// elimunuje contact
// const removeContact = async (contactId) => {
//   try {
//     const data = await fs.readFile(contactsPath);
//     const filterContacts = JSON.parse(data).filter(
//       (data) => Number(data.id) !== Number(contactId)
//     );
//     await fs.writeFile(contactsPath, JSON.stringify(filterContacts));
//     return listContacts();
//   } catch (err) {
//     return err;
//   }
// };

// const addContact = async (name, email, phone) => {
//   try {
//     const data = await fs.readFile(contactsPath);
//     const dataParse = JSON.parse(data);
//     const contactIndex = Number(dataParse[dataParse.length - 1].id) + 1;
//     const addData = [
//       ...dataParse,
//       {
//         id: `${contactIndex}`,
//         name,
//         email,
//         phone,
//       },
//     ];
//     await fs.writeFile(contactsPath, JSON.stringify(addData));

//     return data;
//   } catch (err) {
//     return err;
//   }
// };

// const updateContact = async (id, newContact) => {
//   const data = await fs.readFile(contactsPath);

//   for (let i = 0; data.length; i++) {
//     if (data[i].id === id) {
//       data[i] = newContact;
//       return;
//     }
//   }
// };

module.exports = {
  listContacts,
  getContactById,
  // removeContact,
  // addContact,
  // updateContact,
};
