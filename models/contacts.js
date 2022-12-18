const fs = require('fs/promises');
const path = require('path')
const Joi = require('joi');
const uniqid = require('uniqid');

const contactPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const response = await fs.readFile(contactPath, 'utf-8');
    return JSON.parse(response)
  } catch (error) {
    return error
  }
}
const getContactById = async (contactId) => {
  try {
    const list = await listContacts();
    const result = list.find(element => element.id === contactId);
    return result || null;
  } catch (err) {
    return err
  }
}

const removeContact = async (contactId) => {
  try {
    const list = await listContacts();
    const index = list.findIndex(element => element.id === contactId)
    if (index === -1) {
      return null
    }

    const deletedContact = list.splice(index, 1)
    await fs.writeFile(contactPath, JSON.stringify(list, null, 2));

    return deletedContact;
  } catch (err) {
    return err;
  }
}

const namePatern =
  "[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
const phonePatern =
  '^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$';

const schema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp(namePatern)),
  email: Joi.string()
    .email(),
  phone: Joi.string()
    .pattern(new RegExp(phonePatern)),
})

const addContact = async ({ name, email, phone }) => {
  try {
    const validatedValues = await schema.validate({ name, email, phone })
    console.log(validatedValues)
    const oldList = await listContacts();
    const newContact = {
      id: uniqid(),
      name,
      email,
      phone,
    };
    const newList = [...oldList, newContact];
    await fs.writeFile(contactPath, JSON.stringify(newList, null, 2));

    return newContact;
  } catch (err) {
    return err;
  }
}

const updateContact = async (contactId, { name = '', email = '', phone = '' }) => {
  try {
    await schema.validate({ name, email, phone })
    const contactList = await listContacts();
    const contactToUpdate = await getContactById(contactId);
    const index = contactList.findIndex(contact => contact.id === contactId)
    if (index === -1) {
      return null
    }
    if (name !== '') contactToUpdate.name = name;
    if (email !== '') contactToUpdate.email = email;
    if (phone !== '') contactToUpdate.phone = phone;

    const newList = contactList.splice(index, 1, contactToUpdate)
    await fs.writeFile(contactList, JSON.stringify(newList, null, 2));

    return contactToUpdate;
  } catch (err) {
    return err;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
