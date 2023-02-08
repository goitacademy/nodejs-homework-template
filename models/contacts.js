const fs = require("fs/promises");
const path = require("path");
const joi = require("joi");

const { uid } = require("uid");
const Contact = require("./ContactsModel");

const contactsPath = path.join(__dirname, "contacts.json");

const getAllContacts = async () => {
  try {
    // const listContacts = await Contact.find();
    // console.log(contactsPath);
    // const contactsList = JSON.parse(
    //   await fs.readFile(contactsPath, {
    //     encoding: "utf8",
    //   })
    // );
    return Contact.find();
  } catch (error) {
    console.log(error);
  }
};

const getOneContact = async (contactId) => {
  try {
    const contactsList = await getAllContacts();
    const contactById = contactsList.find(({ id }) => id === contactId);
    return contactById;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await getAllContacts();
    const newContactsList = contactsList.filter(({ id }) => id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(newContactsList), {
      encoding: "utf8",
    });
    return contactsList;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const newContact = {
      id: uid(),
      name,
      email,
      phone,
    };
    const contactsList = await getAllContacts();
    contactsList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList), {
      encoding: "utf8",
    });
    return contactsList;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const contactsList = await getAllContacts();
    contactsList.forEach((el) => {
      if (el.id === contactId) {
        if (name) {
          el.name = name;
        }
        if (email) {
          el.email = email;
        }
        if (phone) {
          el.phone = phone;
        }
      }
    });
    await fs.writeFile(contactsPath, JSON.stringify(contactsList), {
      encoding: "utf8",
    });
    return contactsList;
  } catch (error) {
    console.log(error);
  }
};

const joiSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

module.exports = {
  getAllContacts,
  getOneContact,
  removeContact,
  addContact,
  updateContact,
  joiSchema,
};
