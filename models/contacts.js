<<<<<<< HEAD
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
  { versionKey: false, timestamps: true }
);

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactUpdateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addContact: contactAddSchema,
  updateStatusContact: contactUpdateStatusSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
=======
//Module import
const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
//Veribles
const contactsPath = path.join(__dirname, "contacts.json");
//CODE
async function updateContactFile(data) {
  jsonData = JSON.stringify(data);
  await fs.writeFile(contactsPath, jsonData);
}
async function getListContacts() {
  try {
    return JSON.parse(await fs.readFile(contactsPath, "utf8"));
  } catch (error) {
    return console.error(error.message);
  }
}
async function listContacts() {
  const data = await getListContacts();
  console.table(data);
}

async function getContactById(contactId) {
  const contacts = await getListContacts();
  const filtredContacts = contacts?.find(({ id }) => id === contactId);
  console.table(filtredContacts);
}
async function removeContact(contactId) {
  const contacts = await getListContacts();
  const filtredContacts = contacts?.filter(({ id }) => id !== contactId);
  updateContactFile(filtredContacts);
  console.table(filtredContacts);
}
async function addContact(name, email, phone) {
  const contacts = await getListContacts();
  const newUser = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newUser);
  updateContactFile(contacts);
  console.table(contacts);
}
async function updateContact(contactId, { name, email, phone }) {
  const data = await getListContacts();

  const newContact = {
    id: `${contactId}`,
    name,
    email,
    phone,
  };

  const updateContact = data.find((el) => el.id === contactId);
  console.log(updateContact);
  const updateContactId = data.indexOf(updateContact);
  if (updateContactId === -1) {
    return null;
  } else {
    data.splice(updateContactId, 1, newContact);
    await updateContactFile(data);
  }
  return newContact;
}

module.exports = {
  getListContacts,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
>>>>>>> master
