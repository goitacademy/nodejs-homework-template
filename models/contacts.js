const {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService } = require("../services/contactServices");


const express = require('express')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await listContactsService();
  res.json(contacts);
} catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next, contactId) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactByIdService(contactId);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next, contactId) => {
  try {
    const newContact = await removeContactService(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(errror);
  }
};

const addContact = async (req, res, next, body) => {
  try {
    const { contactID } = req.params;
    const addContactID = await addContactService(contactID);
    res.status(200).json({ message: `Contact ${addContactID} has been deleted` })
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next, contactId, body) => {
  try {
    const { contactID } = req.params;
    const updateContact = await updateContactService(contactID, req.body);
    res.status(200).json(updateContact)
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
