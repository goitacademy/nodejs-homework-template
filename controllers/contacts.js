// const Joi = require('joi');
const contactsFunction = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const allContacts = async (req, res) => {
     const allContacts = await contactsFunction.listContacts();
  res.status(200).json(allContacts);
}

const getContactById = async (req, res) => {
    const { id } = req.params;
    const contactID = await contactsFunction.getContactById(id);
    if (!contactID) {
      throw HttpError(404, 'Not found id');
    }
    res.status(200).json(contactID)
}

const addContact = async (req, res) => {
     const { name, email, phone } = req.body;
    const newContact = await contactsFunction.addContact({ name, email, phone });
        if (!newContact) {
      throw HttpError(404, 'Not found id');
    }
    res.status(201).json(newContact)
}

const removeContact = async (req, res) => {
     const { id } = req.params;
    const contactID = await contactsFunction.removeContact(id);
    if (!contactID) {
      throw HttpError(404, 'Not found id');
    }
    res.status(200).json("contact deleted")
}

const updateContact = async (req, res) => {

      const { id } = req.params;
    const { name, email, phone } = req.body;
    const contactID = await contactsFunction.updateContact(id, { name, email, phone });
     if (!contactID) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(contactID)
}

module.exports = {
    allContacts:ctrlWrapper(allContacts),
    getContactById:ctrlWrapper(getContactById),
    addContact:ctrlWrapper(addContact),
    removeContact:ctrlWrapper(removeContact),
    updateContact:ctrlWrapper(updateContact),
}