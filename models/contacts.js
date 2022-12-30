const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const Joi = require("joi");

const contactsPath = path.resolve(__dirname, "./contacts.json");

const contactSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9]*$/)
    .required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[0-9]*$/)
    .required(),
});

const validator = (schema) => (req, res, next) => {
  const body = req.body;
  const validation = schema.validate(body);

  if (validation.error) {
    res.status(400).send(validation.error);
    return;
  }

  return next();
};

async function readData() {
  try {
    const data = await readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error.message);
  }
}

async function writeData(data) {
  try {
    const contacts = JSON.stringify(data);
    await writeFile(contactsPath, contacts);
  } catch (error) {
    console.error(error.message);
  }
}

const listContacts = async (req, res) => {
  try {
    const contacts = await readData();
    res.status(200).send(contacts);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (req, res) => {
  try {
    const contacts = await readData();
    const id = req.params.contactId;

    const contactById = contacts.find((contact) => contact.id === id);
    if (contactById) {
      res.status(200).send(JSON.stringify(contactById));
    } else {
      res.status(404).send(JSON.stringify({ message: "Not found" }));
    }
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (req, res) => {
  try {
    const contacts = await readData();
    const id = req.params.contactId;
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index !== -1) {
      contacts.splice(index, 1);
      res.status(200).send(JSON.stringify({ message: "Contact deleted" }));
      writeData(contacts);
    } else {
      res.status(404).send(JSON.stringify({ message: "Not found" }));
    }
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (req, res) => {
  try {
    const contacts = await readData();
    const newContact = { id: null, ...req.body };
    if (!validator(contactSchema)) {
      res.status(400).send(JSON.stringify({ message: "missing fields" }));
      return;
    }

    const duplicateContact = contacts.find(
      (contact) => contact.name === newContact.name
    );
    if (duplicateContact) {
      res.status(409).send(
        JSON.stringify({
          message: `Contact with the name ${duplicateContact.name} already exists`,
        })
      );
      return;
    }

    contacts.forEach(({ id }) => {
      newContact.id = String(Number(id) + 1);
    });
    contacts.push(newContact);
    res.status(201).send(JSON.stringify(newContact));
    writeData(contacts);
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (req, res) => {
  try {
    const contacts = await readData();
    if (!validator(contactSchema)) return;
    const { name, email, phone } = req.body;

    const id = req.params.contactId;
    const index = contacts.findIndex((contact) => contact.id === id);

    if (index !== -1) {
      if (name) {
        contacts[index].name = name;
      }
      if (email) {
        contacts[index].email = email;
      }
      if (phone) {
        contacts[index].phone = phone;
      }
      res.status(200).send(JSON.stringify(contacts[index]));
      writeData(contacts);
    } else {
      res.status(404).send(JSON.stringify({ message: "Not found" }));
    }
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
