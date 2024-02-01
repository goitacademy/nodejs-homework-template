const fs = require("fs/promises");
const path = require("path");
const joi = require("joi");
const { model, Schema } = require("mongoose");

const contactsPath = path.join(__dirname, "contacts.json");
const contactBodySchema = joi.object({
  name: joi
    .string()
    .min(3)
    .required()
    .messages({ "any.required": "missing required name field " }),
  phone: joi
    .string()
    .required()
    .messages({ "any.required": "missing required phone field " }),
  email: joi
    .string()
    .email()
    .required()
    .messages({ "any.required": "missing required email field " }),
  favorite: joi.boolean(),
});

const putContactsSchema = joi.object({
  name: joi.string().min(3),
  phone: joi.string(),
  email: joi.string().email(),
  favorite: joi.boolean(),
});

const updateFavoriteSchema = joi.object({
  favorite: joi
    .boolean()
    .required()
    .messages({ "any.required": "missing required favorite field " }),
});

const contactsSchema = new Schema(
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
  {
    versionKey: false,
    timestamps: true,
  }
);

const Contact = model("contact", contactsSchema);

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}
async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);

    const contactById =
      parsedContacts.find((contact) => contact.id === contactId) ?? null;

    return contactById;
  } catch (error) {
    console.log("error: ", error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const removedContact = await getContactById(contactId);
    if (!removedContact) {
      return null;
    }
    const newContacts = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );
    const stringifyContacts = JSON.stringify(newContacts, null, 2);
    await fs.writeFile(contactsPath, stringifyContacts);
    return removedContact;
  } catch (error) {
    console.log("error: ", error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const newContact = { id: Math.random().toString(), name, email, phone };
    const newContacts = [...parsedContacts, newContact];
    const stringifyContacts = JSON.stringify(newContacts, null, 2);
    await fs.writeFile(contactsPath, stringifyContacts);

    return newContact;
  } catch (error) {
    console.log("error: ", error);
  }
}
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.map((contact) => {
    if (contact.id === contactId) {
      return { ...contact, ...body };
    }
    return contact;
  });

  const stringifyContacts = JSON.stringify(updatedContacts, null, 2);
  await fs.writeFile(contactsPath, stringifyContacts);

  const updatedContact =
    updatedContacts.find((contact) => contact.id === contactId) ?? null;
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  contactBodySchema,
  putContactsSchema,
  updateFavoriteSchema,
  Contact,
};
