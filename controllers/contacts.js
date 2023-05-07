const contacts = require('../models/contacts');

const { HttpError, cntrlWrapper } = require("../helpers");


const getAll = async (requirement, response) => {
    const result = await contacts.listContacts();
    response.status(200).json(result);
}

const getById = async (requirement, response) => {
    const { contactId } = requirement.params;
    const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not Found contact");
  }
    response.status(200).json(result);
  }
  

const addContact = async (requirement, response) => {
    const result = await contacts.addContact(requirement.body);
    response.status(201).json(result);
  }
  

const updateById = async (requirement, response) => {
   const { contactId } = requirement.params;
    const result = await contacts.updateContact(contactId, requirement.body);
    if (!result) {
    throw HttpError(404, "Not Found contact");
   }
    response.status(200).json(result);
  }
  

const deleteById = async (requirement, response) => {
    const { contactId } = requirement.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not Found contact");
    }
    response.status(200).json ({
      message: "Сontact deleted"
    })
  }
 

module.exports = {
    getAll: cntrlWrapper(getAll),
    getById: cntrlWrapper(getById),
    add: cntrlWrapper(addContact),
    updateById: cntrlWrapper(updateById),
    deleteById: cntrlWrapper(deleteById),
};