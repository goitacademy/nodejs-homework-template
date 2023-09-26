const fs = require('fs/promises')
const Joi = require("joi");

const contactsPath = path.join(__dirname, "contacts.json");


const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    throw new Error("Contact not found");
  } else {
    return contact;
  }
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
}

const validateContact = (contact) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  return schema.validate(contact);
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: String(Date.now()),
    name,
    email,
    phone
  };

  const { error } = validateContact(newContact);

  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;

}

const updateContact = async (contactId, body) => {
   const contacts = await listContacts();
   const index = contacts.findIndex((contact) => contact.id === contactId);

   if (index === -1) {
     throw new Error("Contact not found");
   }

   const updatedContact = { ...contacts[index], ...body };
   const { error } = validateContact(updatedContact);

   if (error) {
     throw new Error(`Validation error: ${error.details[0].message}`);
   }

   contacts[index] = updatedContact;
   await fs.writeFile(contactsPath, JSON.stringify(contacts));
   return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
