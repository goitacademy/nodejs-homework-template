import path from 'path';
import Joi from 'joi';
import { promises } from 'fs';
import { nanoid } from 'nanoid';

const contactsPath = path.join(process.cwd(), 'models/contacts.json');
const schemaAdd = Joi.object({
  id: Joi.string(),
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.number().greater(5).required(),
});

const schemaUpdate = Joi.object({
  id: Joi.string(),
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.number().greater(5),
});

const contactList = async () => {
  try {
    const data = await promises.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    return error.message;
  }
};

const getContactById = async contactId => {
  try {
    const data = await promises.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const searchContact = contacts.filter(contact => contact?.id === contactId);
    return searchContact[0];
  } catch (error) {
    return error.message;
  }
};

const removeContact = async contactId => {
  try {
    const data = await promises.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const contactsAfterDelete = contacts.filter(contact => contact?.id !== contactId);
    const updatedContactList = [...contactsAfterDelete];
    if (contactsAfterDelete !== contacts) {
      await promises.writeFile(contactsPath, JSON.stringify(updatedContactList));
    }
  } catch (error) {
    return error.message;
  }
};

const addContact = async body => {
  const { name, email, phone } = body;
  try {
    const data = await promises.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);

    await schemaAdd.validateAsync({ name, email, phone });
    const newContact = { id: nanoid(), name, email, phone };

    const updatedContactList = [...contacts, newContact];
    await promises.writeFile(contactsPath, JSON.stringify(updatedContactList));

    return { newContact };
  } catch (error) {
    const errorReason = error.details[0].path.toString();
    return { errorMessage: `missing required ${errorReason} - field` };
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const isBodyEmpty = Object.keys(body).length === 0;
  if (isBodyEmpty) {
    return { errorType: 400, errorMessage: `Missing fields` };
  }
  try {
    const data = await promises.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const search = contacts.find(contact => contact?.id === contactId);

    if (!search) {
      return { errorType: 404, errorMessage: `Not found` };
    }

    await schemaUpdate.validateAsync({ name, email, phone });

    const updatedContact = {
      id: search.id,
      name: name !== undefined ? name : search.name,
      email: email !== undefined ? email : search.email,
      phone: phone !== undefined ? phone : search.phone,
    };
    const updatedContactList = [...contacts, updatedContact];
    await promises.writeFile(contactsPath, JSON.stringify(updatedContactList));
    return { updatedContact };
  } catch (error) {
    return error.message;
  }
};

export { contactList, getContactById, removeContact, addContact, updateContact };