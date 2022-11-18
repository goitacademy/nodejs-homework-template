const fs = require("fs/promises");
const path = require("path");
const Joi = require("joi");
const contactsPath = path.resolve("./models/contacts.json");

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const listContacts = async () => {
  try {
    const data = await fs.readFile(`${contactsPath}`);
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(`${contactsPath}`);
    const contacts = JSON.parse(data);
    return contacts.find((contact) => contact.id === contactId.toString());
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  return listContacts()
    .then((data) => {
      const contactsListWithoutRemovedContact = data.filter(
        (contact) => contact.id !== contactId.toString()
      );
      if (contactsListWithoutRemovedContact.length === data.length) {
        return false;
      }
      fs.writeFile(
        `${contactsPath}`,
        JSON.stringify(contactsListWithoutRemovedContact)
      );
      return true;
    })
    .catch((err) => console.log(err.message));
};

const addContact = async (body) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
  });

  const { name, email, phone } = body;

  const bodyIsValid = schema.validate({
    name: name,
    email: email,
    phone: phone,
  });

  if (bodyIsValid.error) {
    return bodyIsValid.error.message;
  }

  const newContact = {
    id: getRandomIntInclusive(1, 100).toString(),
    name,
    email,
    phone,
  };

  return listContacts()
    .then((data) => {
      data.push(newContact);
      fs.writeFile(`${contactsPath}`, JSON.stringify(data));
      return newContact;
    })
    .catch((err) => console.log(err.message));
};

const updateContact = async (contactId, body) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/),
  });

  const { name, email, phone } = body;

  const bodyIsValid = schema.validate({
    name: name,
    email: email,
    phone: phone,
  });

  return listContacts().then((data) => {
    const indexOfContact = data.indexOf(
      data.find((contact) => contact.id === contactId.toString())
    );
    if (indexOfContact === -1) {
      return 404;
    }
    if (bodyIsValid.error) {
      return bodyIsValid.error.message;
    }
    if (name) {
      data[indexOfContact].name = name;
    }
    if (email) {
      data[indexOfContact].email = email;
    }
    if (phone) {
      data[indexOfContact].phone = phone;
    }

    fs.writeFile(`${contactsPath}`, JSON.stringify(data));
    return data[indexOfContact];
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
