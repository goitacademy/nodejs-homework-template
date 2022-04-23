const fs = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "contacts.json");
const { nanoid } = require("nanoid");
const Joi = require("joi");
const listContacts = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  const contacts = JSON.parse(data);

  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  if (!result) {
    return null;
  }
  console.log(result);
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === `${contactId}`);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(filePath, JSON.stringify(newContacts));
  const message = "contact deleted";
  return { message };
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    phone: Joi.string()
      .min(5)
      .pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  });
  const validations = schema.validate(body);
  if (validations.error) {
    return { error: validations.error };
  }
  const newContact = {
    id: nanoid(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };

  const newContacts = [...contacts, newContact];
  await fs.writeFile(filePath, JSON.stringify(newContacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    phone: Joi.string()
      .min(5)
      .pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });
  const validations = schema.validate(body);
  if (validations.error) {
    return { error: validations.error };
  }
  const idx = contacts.findIndex((contact) => contact.id === `${contactId}`);
  if (idx === -1) {
    return null;
  }
  contacts.forEach((contact) => {
    if (contact.id === contactId) {
      contact.name = body.name ? body.name : contact.name;
      contact.email = body.email ? body.email : contact.email;
      contact.phone = body.phone ? body.phone : contact.phone;
    }
  });

  // const removeOldContact = contacts.filter((_, index) => index !== idx);
  // const newContact = {
  //   id: contacts[idx].id,
  //   name: body.name,
  //   email: body.email,
  //   phone: body.phone,
  // };

  // const newContacts = [...removeOldContact, newContact];
  await fs.writeFile(filePath, JSON.stringify(contacts));

  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
