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
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactByIdService(contactId);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const newContact = await removeContactService(contactId);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'missing required name, email, or phone field' });
    }

    const newContact = { name, email, phone };
    const addedContact = await addContactService(newContact);

    res.status(201).json(addedContact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateContact = await updateContactService(contactId);
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
