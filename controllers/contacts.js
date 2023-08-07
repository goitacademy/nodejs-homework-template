const contacts = require("../models/contacts");
const { HttpError } = require("../helpers/HttpError");
const { ctrlWrapper } = require("../helpers");
const Joi = require("joi");

const getAllContactsList = async (req, res, next) => {
 
    const result = await contacts.listContacts();
    res.status(200).json(result);
}

const getContactsById = async (req, res) => {
  
    const { id } = req.params;
   
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    return res.status(200).json(result);
 
};

const addContact = async (req, res) => {
 
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
 
};

const deleteContact = async (req, res) => {

    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.status(200).json({ message: "Contact deleted" });
  
};

const updateContact = async (req, res) => {
  
  
    const { id } = req.params;
      const result = await contacts.updateContact(id, req.body);
      if (!result) {
        throw HttpError(404, "Contact not found");
      }
    res.status(200).json(result)

 
};

module.exports = {
    getAllContactsList: ctrlWrapper(getAllContactsList),
    getContactsById: ctrlWrapper(getContactsById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact),

}