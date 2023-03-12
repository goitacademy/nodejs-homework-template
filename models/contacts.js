const fs = require("fs/promises");
const Joi = require("joi");

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

const listContacts = async () => {
  const res = await fs.readFile("./models/contacts.json");
  return JSON.parse(res.toString());
};

const getContactById = async (contactId) => {
  const list = await listContacts();
  const searchedElement = list.find(
    (el) => el.id.toString() === contactId.toString()
  );
  return searchedElement;
};

const removeContact = async (contactId) => {
  const list = await listContacts(contactId);
  const tabIndex = list.findIndex((el) => el.id.toString() === contactId);
  list.splice(tabIndex, 1);
  if (tabIndex === -1) {
    return JSON.parse(list);
  }
  await fs.writeFile("./models/contacts.json", JSON.stringify(list));
};

const addContact = async (body) => {
  const list = await listContacts();
  const response = JSON.stringify(body);
  const forbiddenID = list.find(
    (el) => el.id.toString() === JSON.parse(response).id.toString()
  );
  if (forbiddenID) {
    return forbiddenID.id.toString();
  }
  const validatedContact = schema.validate(body);
  if (validatedContact.error) {
    const messageArr = validatedContact.error.message.split(" ");
    return messageArr[0];
  }

  const newList = list.concat([validatedContact.value]);
  if (!forbiddenID) {
    fs.writeFile("./models/contacts.json", JSON.stringify(newList));
  }
  return response;
};

const updateContact = async (contactId, body) => {
  const list = await listContacts();
  const contactToUpdate = list.find((el) => el.id === contactId);
  const tabIndex = list.findIndex((el) => el.id === contactId);
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
  list.splice(tabIndex, 1, validatedContact.value);
  fs.writeFile("./models/contacts.json", JSON.stringify(list));
  return validatedContact.value;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
