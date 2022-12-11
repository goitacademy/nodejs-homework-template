const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
    
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  
})

const Contact = model("contact", contactSchema);

module.exports = Contact;

// const fs = require('fs/promises');
// const path = require('path');

// const contactsPath = path.resolve(__dirname, "./contacts.json");

// const getData = async () => {
//     const result = await fs.readFile(contactsPath);
//     return JSON.parse(result) ?? null;
// }

// const updateContactsList = async (result) => {
//   return await fs.writeFile(contactsPath, JSON.stringify(result));
// }

// const listContacts = async () => {
//     return await getData();
// } 

// const getContactById = async (contactId) => {
//     const result = (await getData())?.find(({ id }) => id === contactId.toString());
//     return result;
// }

// const removeContact= async(id) => {
//     const contacts = await getData();
//     const index = contacts.findIndex(item => item.id === id);
//     if(index === -1){
//         return null;
//     }
//     const [result] = contacts.splice(index, 1);
//     await updateContactsList(contacts);
//     return result;
// }

// const addContact = async ({name, email, phone}) => {
//     const contactNew = {
//         name,
//         email,
//         phone,
//         id: ((await getData())?.length + 1).toString()
//     };
//     await updateContactsList([...(await getData()), contactNew]);
    
//   return contactNew;
// }

// const updateContact = async (id, data) => {
//   const contacts = await getData();
//   const index = contacts.findIndex(item => item.id === id.toString());
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { id, ...data };
//   await updateContactsList(contacts);

//   return contacts[index]
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
