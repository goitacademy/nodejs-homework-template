const { nanoid } = require("nanoid");
const Joi = require("joi");
const fs = require("fs/promises");
const path = require("path");
const { HttpError } = require("../helpers/helpers");
const contactsPath = path.resolve("./models/contacts.json");

async function readContacts() {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function writeContacts(value) {
  try {
    const contacts = await fs.writeFile(
      contactsPath,
      JSON.stringify(value, null, 4)
    );
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

const listContacts = async ({ limit = 0 }) => {
  try {
    const contacts = await readContacts();
    return contacts.slice(-limit);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await readContacts();
    const contact = await contacts.find((el) => {
      return String(el.id) === contactId;
    });
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(2).max(30).required(),
      phone: Joi.string().trim().length(10).pattern(/^\d+$/).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: false },
        })
        .min(3)
        .required(),
    });
    const { error } = schema.validate(body);
    if (error) {
      console.log(error.message);
      return HttpError(400, error.message);
    }
    const contacts = await readContacts();
    const id = nanoid();
    const contactToAdd = {
      id,
      ...body,
    };
    const contactsWithAddedNewOne = [...contacts, contactToAdd];
    await writeContacts(contactsWithAddedNewOne);
    return contactToAdd;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await readContacts();
    const newContacts = await contacts.filter((el) => {
      return String(el.id) !== contactId;
    });
    await writeContacts(newContacts);
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await readContacts();
    const contactToUpdate = {
      id: contactId,
      ...body,
    };
    const contactsWithoutUpdatedOne = await contacts.filter((el) => {
      return String(el.id) !== contactId;
    });
    const contactsWithUpdatedOne = [
      ...contactsWithoutUpdatedOne,
      contactToUpdate,
    ];
    await writeContacts(contactsWithUpdatedOne);
    return contactToUpdate;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
