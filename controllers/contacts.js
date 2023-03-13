const fs = require("fs").promises;
// const { Contact } = require("./contact.js");

const path = require("path");
const contactsPath = path.resolve("./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    return err;
  }
};

// const getContactById = async (id) => {
//   try {
//     const data = await fs.readFile(contactsPath);
//     const parseData = JSON.parse(data);
//     return parseData.map((data) => {
//       if (Number(data.id) === Number(id)) {
//         return data;
//       }
//       return data;
//     });
//   } catch (err) {
//     return err;
//   }
// };

// const removeContact = async (id) => {
//   try {
//     const data = await fs.readFile(contactsPath);
//     const filterContacts = JSON.parse(data).filter(
//       (data) => Number(data.id) !== Number(id)
//     );
//     await fs.writeFile(contactsPath, JSON.stringify(filterContacts));
//     return listContacts();

//     // for (let i = 0; i < data.length; i++) {
//     //   if (data[i].id === id) {
//     //     data.splice(i, 1);
//     //     return;
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
  // getContactById,
  // removeContact,
  // addContact,
  // updateContact,
};
