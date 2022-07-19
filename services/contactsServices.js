const contactsModels = require("../models");

const getAll = async () => {
  try {
    const data = await contactsModels.listContacts();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (contactId) => {
  try {
    const data = await contactsModels.getContactById(contactId);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const create = async (contacData) => {
  try {
    const data = await contactsModels.addContact(contacData);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const update = async (contactId, contactData) => {
  try {
    const data = await contactsModels.updateContact(contactId, contactData);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const remove = async (contactId) => {
  try {
    const data = await contactsModels.removeContact(contactId);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { getAll, getById, create, update, remove };
