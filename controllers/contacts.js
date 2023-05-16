<<<<<<< HEAD
const { Contact } = require("../models/contact");

const addContact = async (name, email, phone, favorite) => {
  try {
    const contact = new Contact(name, email, phone, favorite);
    contact.save();
    return contact;
  } catch (err) {
    console.log(err);
  }
};

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (_id) => {
  const contact = await Contact.findOne({ _id });
  return contact;
};

const removeContact = async (_id) => {
  try {
    return Contact.findByIdAndDelete({ _id });
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (id, newUser) => {
  const updatedContact = await Contact.findByIdAndUpdate(id, newUser, {
    new: true,
  });
  return updatedContact;
};

const updateStatusContact = async (id, favorite) => {
  const updatedStatus = await Contact.findByIdAndUpdate(id, { favorite });
  updatedStatus.favorite = favorite;
  return updatedStatus;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
=======
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
>>>>>>> 03ddca3ab856225ac93889b1ec630c997ac37fef
