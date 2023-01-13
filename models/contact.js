const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
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
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(7).required(),
  favorite: Joi.bool(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
};

// const contactsPath = path.resolve(__dirname, "contacts.json");

// const listContacts = async () => {
//   const contactsRaw = await fs.readFile(contactsPath);
//   const contacts = JSON.parse(contactsRaw);
//   return contacts;
// };

// const getContactById = async (contactId) => {
//   const contactsRawBufer = await fs.readFile(contactsPath);
//   const contacts = JSON.parse(contactsRawBufer);
//   const updatedContacts = contacts.find((contact) => contact.id === contactId);

//   return updatedContacts || null;
// };

// const removeContact = async (contactId) => {
//   const contactsRaw = await fs.readFile(contactsPath);
//   const contacts = JSON.parse(contactsRaw);
//   const updatedContact = contacts.find((contact) => contact.id === contactId);

//   if (!updatedContact) {
//     return false;
//   } else {
//     const filteredContacts = contacts.filter(
//       (contact) => contact.id !== contactId
//     );

//     await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
//     return true;
//   }
// };

// const addContact = async (body) => {
//   const id = nanoid();

//   const contact = { id, ...body };

//   const contactsRawBufer = await fs.readFile(contactsPath);
//   const updatedContacts = JSON.parse(contactsRawBufer);
//   updatedContacts.push(contact);

//   await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
//   return contact;
// };

// const updateContact = async (contactId, body) => {
//   const contactsRawBufer = await fs.readFile(contactsPath);
//   const contacts = JSON.parse(contactsRawBufer);
//   const updatedContact = contacts.find((contact) => {
//     if (contact.id === contactId) {
//       return true;
//     }
//     return false;
//   });

//   if (updatedContact) {
//     updatedContact.name = body.name;
//     updatedContact.email = body.email;
//     updatedContact.phone = body.phone;
//   } else {
//     return null;
//   }

//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return updatedContact;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
