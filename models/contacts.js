const fs = require("fs/promises");
const Joi = require("joi");

const listContacts = async () => {
  const res = await fs.readFile("./models/contacts.json");
  return res.toString();
};

const getContactById = async (contactId) => {
  const list = await listContacts();
  const searchedElement = JSON.parse(list).find(
    (el) => el.id.toString() === contactId.toString()
  );
  const response = JSON.stringify(searchedElement);
  return !response ? JSON.stringify("undefined") : response;
};

const removeContact = async (contactId) => {
  const list = await listContacts(contactId);
  const response = JSON.parse(list);
  const tabIndex = response.findIndex((el) => el.id === contactId);
  response.splice(tabIndex, 1);
  if (tabIndex === -1) {
    return JSON.parse(response);
  }
  await fs.writeFile("./models/contacts.json", JSON.stringify(response));
};

const addContact = async (body) => {
  const list = await listContacts();
  const contacts = JSON.parse(list);
  const response = JSON.stringify(body);
  const forbiddenID = contacts.find((el) => el.id === JSON.parse(response).id);
  if (forbiddenID) {
    return;
  }
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(2).max(40).required(),
    phone: Joi.number().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "pl", "org"] },
      })
      .required(),
  });
  const validatedContact = schema.validate(body);
  if (validatedContact.error) {
    return;
  }
  const newList = contacts.concat([validatedContact]);
  fs.writeFile("./models/contacts.json", JSON.stringify(newList));
  return response;
};

const updateContact = async (contactId, body) => {
  const list = await listContacts();
  const contactsList = JSON.parse(list);
  const contactToUpdate = contactsList.find((el) => el.id === contactId);
  const tabIndex = contactsList.findIndex((el) => el.id === contactId);
  if (tabIndex === -1) {
    return;
  }
  const { email, phone, name } = body;
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(2).max(40).required(),
    phone: Joi.number().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "pl", "org"] },
      })
      .required(),
  });
  contactToUpdate.email = email;
  contactToUpdate.phone = phone;
  contactToUpdate.name = name;
  const validatedContact = schema.validate(contactToUpdate);
  if (validatedContact.error) {
    return;
  }
  contactsList.splice(tabIndex, 1, validatedContact);
  fs.writeFile("./models/contacts.json", JSON.stringify(contactsList));
  return validatedContact.value;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
