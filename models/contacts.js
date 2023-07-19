const fs = require("fs/promises");
const path = require("path");
const nanoid = require("nanoid");
const contactsPatch = path.join(__dirname, "contacts.json");
const Joi = require("joi");

const schemaAddContact = Joi.object({
  phone: Joi.string()
    .pattern(/^\d{6,10}$/)
    .required(),
  name: Joi.string().alphanum().min(3).max(15).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
});
const schemaPhone = Joi.object({ phone: Joi.string().pattern(/^\d{6,10}$/) });
const schemaName = Joi.object({
  name: Joi.string().alphanum().min(3).max(15),
});
const schemaEmail = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ua"] },
  }),
});

const listContacts = async () => {
    const response = await fs.readFile(contactsPatch);
    if(!response || response.length === 0){
      return null
    }
    const contacts = JSON.parse(response);
    return {status: 200, contacts };
};

const getContactById = async (contactId) => {
    const resGetContacts = await listContacts();
    if(!resGetContacts){
      return null
    }
      const contactIndex = resGetContacts.contacts.findIndex(
        (el) => el.id === contactId
      );
      if (contactIndex === -1) {
        return null
      }
      const contact = resGetContacts.contacts[contactIndex];
      return { status: 200, contact }; 
};

const addContact = async ({ name, email, phone }) => {
  const contact = { id: nanoid.nanoid(), name, email, phone };
  if (!name || !email || !phone) {
    return { status: 400, message: "Missing required name field" };
  }
  try {
    await schemaAddContact.validateAsync({
      name: name,
      email: email,
      phone: phone,
    });
    const resGetContacts = await listContacts();
    if(!resGetContacts){
      return null
    }
    resGetContacts.contacts.push(contact);
    const updatedList = JSON.stringify(resGetContacts.contacts, null, 2);
    await fs.writeFile(contactsPatch, updatedList);
    return { status: 201, contact };
  } catch (error) {
    const {message} = error
    return { status: 400, message };
  }
};

const removeContact = async (contactId) => {
  const resGetContacts = await listContacts();
  if(!resGetContacts){
    return null
  }
  const contactIndex = resGetContacts.contacts.findIndex(
    (el) => el.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  resGetContacts.contacts.splice(contactIndex, 1);
  await fs.writeFile(
    contactsPatch,
    JSON.stringify(resGetContacts.contacts, null, 2)
  );
  return { status: 200, message: "Contact deleted" };
};

const updateContact = async (contactId, body) => {
  if (!body.name && !body.email && !body.phone) {
    return { status: 400, message: "Missing fields" };
  }
  try {
    await schemaName.validateAsync({ name: body.name });
    await schemaEmail.validateAsync({ email: body.email });
    await schemaPhone.validateAsync({ phone: body.phone });
    const resGetContacts = await listContacts();
    if(!resGetContacts){
      return null
    }
    const contactIndex = resGetContacts.contacts.findIndex(
      (el) => el.id === contactId
    );
    if (contactIndex === -1) {
      return null
    }
    const contact = Object.assign(resGetContacts.contacts[contactIndex], body);
    resGetContacts.contacts[contactIndex] = contact;
    await fs.writeFile(
      contactsPatch,
      JSON.stringify(resGetContacts.contacts, null, 2)
    );
    return { status: 200, contact };
  } catch (error) {
    const {message} = error
    return { status: 400, message };
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
