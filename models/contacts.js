const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema(
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
  { versionKey: false }
);

const mySchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  favorite: Joi.boolean(),
});

const statusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, mySchema, statusSchema }

// const contactPath = path.join(__dirname, "contacts.json");

// const updateSet = async (body) =>
//   fs.writeFile(contactPath, JSON.stringify(body, null, 2));

// const listContacts = async () => {
//   const contacts = await fs.readFile(contactPath);
//   return JSON.parse(contacts);
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.Id === contactId);
//   if (index === -1) 
//     return null;
//     return contacts[index];
  
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();

//   const index = contacts.findIndex((contact) => contact.Id === contactId);
//   if (index === -1) 
//     return null;

//     const deleteContact = contacts.splise(index, 1);
//     await updateSet(contacts);
    
//     return deleteContact;
// };

// const addContact = async (name, email, phone) => {
//   const contacts = await listContacts();
//   const newContact = {
//     id: uuidv4(),
//     name,
//     email,
//     phone
//   }
//   contacts.push(newContact)

//   await updateSet(contacts)

//   return newContact
// };

// const updateContact = async (contactId, body) => {
//   const contacts = await listContacts();

//   const index = contacts.findIndex((contact) => contact.Id === contactId);
//   if (index === -1) 
//     return null;

//     const updateContac= {
//       ...contacts[index],
//       ...body,
//     }
//     contacts[index] = updateContac;

//     return updateContac
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
