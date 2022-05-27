const req = require("express/lib/request");
const uniqid = require("uniqid");
const Joi = require("joi");
const res = require("express/lib/response");

const fs = require("fs").promises;
const uniqId = uniqid();
const listContacts = async () => {
  const data = await fs.readFile("./models/contacts.json", "utf8");

  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await fs.readFile("./models/contacts.json", "utf8");
  if (!data) {
    throw new WrongParametersError(
      `Failure, no posts with id '${contactId}' found!`
    );
  }
  return JSON.parse(data).map((contact) => {
    if (contactId === contact.id) {
      return contact;
    }
  });
};

const removeContact = async (contactId) => {
  const data = await fs.readFile("./models/contacts.json", "utf8");
  const contactsWithoutRemovedContact = JSON.parse(data).filter(
    (contact) => contact.id !== contactId
  );
  return contactsWithoutRemovedContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(15).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().required(),
  });

  const validateResult = schema.validate(body);
  if (validateResult.error) {
    return res.status(400).json;
  }

  const data = await fs.readFile("./models/contacts.json", "utf8");

  return [...JSON.parse(data), { uniqId, name, email, phone }];
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(15).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().required(),
  });

  const validateResult = schema.validate(body);
  if (validateResult.error) {
    return res.status(400).json;
  }

  const data = await listContacts();
  console.log(data);

  data.forEach((contact, idx) => {
    if (contactId === contact.id) {
      // console.log(contact);
      // contact.name = name;
      // contact.email = email;
      // contact.phone = phone;
      // console.log(contact);
      if (name) {
        contact.name = name;
      }
      if (email) {
        contact.email = email;
      }
      if (phone) {
        contact.phone = phone;
      }
      return contact;
    }
  });
  await fs.writeFile("./models/contacts.json", JSON.stringify(data));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
