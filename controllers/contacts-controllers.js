const contactsServices = require("../models/contacts");

const { HttpError } = require("../helpers");


const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactsServices.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
}

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(contactId);
    const contact = await contactsServices.getContactById(contactId);
    if (!contact) {
      throw HttpError(404, "Not Found");
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
}

const add = async (req, res, next) => {
  try {
    const result = await contactsServices.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

const removeContact = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contactsServices.removeContact(contactId);
    if(!result){
      throw HttpError(404, "Not Found");
    }
    res.json({
      "message": "contact deleted"});
  } catch (error) {
    next(error);
  }
}

const update = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contactsServices.updateContact(contactId, req.body);
    res.status(200).json(result);   
  } catch (error) {
    next(error);
  }
}


module.exports = {
  listContacts,
  getById,
  add,
  removeContact,
  update,
}