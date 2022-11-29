const { readFile, writeFile } = require("fs/promises");
const Joi = require("joi");
const { join } = require("path");
const { v4: uuid } = require("uuid");

const pathContacts = join(__dirname, "contacts.json");

const updateContacts = async (data) =>
  await writeFile(pathContacts, JSON.stringify(data), "utf-8");

const schema = Joi.object({
  name: Joi.string()
    .regex(/^[A-Z]+ [A-Z]+$/i)
    .min(3)
    .max(30)
    .required(),

  number: Joi.string()
    .length(10)
    .pattern(/^\d+$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const listContacts = async () => {
  try {
    const data = await readFile(pathContacts, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const [contactById] = contacts.filter((cont) => cont.id === contactId);

    if (!contactById) throw new Error("Not found");
    return contactById;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();

    const id = uuid();
    const newContact = { id, ...body };
    contacts.push(newContact);

    await updateContacts(contacts);

    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((cont) => cont.id === contactId);
    if (contactIndex === -1) throw new Error("Not found");

    const contactDeleted = contacts.splice(contactIndex, 1);
    await updateContacts(contacts);

    return contactDeleted;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactsObj = await schema.validateAsync(body);
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((cont) => cont.id === contactId);
    if (contactIndex === -1) throw new Error("Not found");

    const contactUpdated = { contactId, ...body };
    contacts.splice(contactIndex, 1, contactUpdated);
    await updateContacts(contacts);

    return contactUpdated;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
