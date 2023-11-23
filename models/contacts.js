const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const { Contact } = require('./contacts-db');

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    console.log('Contacts found:', contacts);
    return contacts;
  } catch (error) {
    console.error('Error listing contacts:', error.message);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    console.error('Error getting contact by ID:', error.message);
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
      throw new Error('Contact not found');
    }

    return { message: 'Contact deleted' };
  } catch (error) {
    console.error('Error removing contact:', error.message);
    throw error;
  }
};

const addContact = async (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const { error } = schema.validate(body);

  if (error) {
    throw new Error(error.details[0].message);
  }

  try {
    const newContact = await Contact.create({
      id: uuidv4(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      favorite: body.favorite || false,
    });
    return newContact;
  } catch (error) {
    console.error('Error adding contact:', error.message);
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        name: body.name,
        email: body.email,
        phone: body.phone,
        favorite: body.favorite || false,
      },
      { new: true }
    );

    if (!updatedContact) {
      throw new Error('Contact not found');
    }

    return updatedContact;
  } catch (error) {
    console.error('Error updating contact:', error.message);
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
