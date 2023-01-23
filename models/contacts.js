const mongoose = require("mongoose")

const schema = mongoose.Schema(
      {
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
      }, {
        versionKey: false,
        timestamps: true,
  }
    )

    const Contact = mongoose.model("contact", schema)
    
module.exports = {
     Contact,
   }

// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.resolve(__dirname, "contacts.json");

// async function readContacts() {
//   const data = await fs.readFile(contactsPath);
//   const contacts = JSON.parse(data);
//   return contacts;
// }

// async function writeContacts(contacts) {
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
// }

// const listContacts = async () => {
//   const contacts = await readContacts();
//   return contacts;
// };

// const getContactById = async (contactId) => {
//   const contacts = await readContacts();
//   const contact = contacts.find((item) => item.id === contactId);
//   return contact || null;
// };

// const removeContact = async (contactId) => {
//   const contacts = await readContacts();
//   const updatedContacts = contacts.filter((item) => item.id !== contactId);
//   await writeContacts(updatedContacts);
// };

// const addContact = async (body) => {
//   const id = nanoid(3);
//   const contacts = await readContacts();
//   const newContact = { id, ...body };
//   contacts.push(newContact);
//   await writeContacts(contacts);
//   return newContact;
// };

// const updateContact = async (contactId, body) => {
//   const contacts = await readContacts();
//   const [contact] = contacts.filter((item) => item.id === contactId);
//   contact.name = body.name;
//   contact.email = body.email;
//   contact.phone = body.phone;
//   await writeContacts(contacts);
//   return contact;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
