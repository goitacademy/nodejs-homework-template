const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(/^[\p{L} ,.'-]+$/u),

  phone: Joi.string().pattern(new RegExp("^[+\\d\\s-]+$")),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ro"] },
  }),
});

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.filter((elem) => elem.id === contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return newContacts;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    let ValidationError = null;
    try {
      await schema.validateAsync({
        name,
        email,
        phone,
      });
    } catch (error) {
      ValidationError = error;
    }
    if (ValidationError) {
      return {
        statusCode: 400,
        message: { message: "Please modify required fields!" },
      };
    }
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const newContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return { statusCode: 200, message: newContacts };
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    let ValidationError = null;
    try {
      await schema.validateAsync({
        name,
        email,
        phone,
      });
    } catch (error) {
      ValidationError = error;
    }
    if (ValidationError) {
      return {
        statusCode: 400,
        message: { message: "Please modify required fields!" },
      };
    }
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      contacts[index].name = body.name ? body.name : contacts[index].name;
      contacts[index].email = body.email ? body.email : contacts[index].email;
      contacts[index].phone = body.phone ? body.phone : contacts[index].phone;
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return { statusCode: 200, message: contacts };
    } else {
      return { statusCode: 404, message: { message: "Not found" } };
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
