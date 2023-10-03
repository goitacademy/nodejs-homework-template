// const fs = require('fs/promises')
const { nanoid } = require("nanoid");
const path = require('path');
const writeJSONToFile = require("../utils/writeJSONToFile");
const readJSONFromFile = require("../utils/readJSONFromFile");
const createError = require('../utils/createError');
const ERROR_TYPES = require('../constants/errors');


const MODELS_PATH = path.join(__dirname, 'contacts.json');
console.log(MODELS_PATH)



const listContacts = async () => {
  const contacts = await readJSONFromFile(MODELS_PATH);
    return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === contactId);
  
  if (!contact) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: "Not found",
    });
    throw error;
  }

  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactToRemove = contacts.find(contact => contact.id === contactId);

  if (!contactToRemove) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: "Not found",
    });
    throw error;
  }

  const newContacts = contacts.filter(contact => contact.id !== contactId);
  await writeJSONToFile(MODELS_PATH, newContacts);
  return newContacts

}

const addContact = async (body) => {
  const { name, email, phone } = body;

  if (!name || !email || !phone) {
    const error = createError(ERROR_TYPES.BAD_REQUEST, {
      message: "missing required field",
    })
    throw error
  }

  const contact = {
    ...body,
    id: nanoid(),
  };

  const models = await readJSONFromFile(MODELS_PATH)
  models.push(contact);
  await writeJSONToFile(MODELS_PATH, models)
  return contact;
};


const checkRequiredFields = (body, fields) => {
  for (const field of fields) {
    if (!body[field]) {
      const error = createError(ERROR_TYPES.BAD_REQUEST, {
        message: `missing required ${field} field`,
      });
      throw error;
    }
  }
};


const updateContact = async (contactId, body) => {
  const content = await readJSONFromFile(MODELS_PATH);
  const contact = content.find(contact => contact.id === contactId);
  
  if (!contact) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: "Not found",
    });
    throw error;
  }

   const { name, email, phone } = body;

  if (!name && !email && !phone) {
    const error = createError(ERROR_TYPES.BAD_REQUEST, {
      message: "missing fields",
    });
    throw error;
  }

  

   const requiredFields = ['name', 'email', 'phone'];
  checkRequiredFields(body, requiredFields);

  const updatedContact = {
    ...contact,
    ...body,
  };

  const idx = content.indexOf(
    content.find(contact => contact.id === contactId),
  );
  content[idx] = updatedContact;
  await writeJSONToFile(MODELS_PATH, content);


  return updatedContact;
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
