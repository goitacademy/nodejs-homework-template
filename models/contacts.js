// const fs = require('fs/promises')
const contacts = require("../models/contacts.json");
const { v4 } = require("uuid");

const listContacts = async (req, res, next) => {
  try {
    res.json({ contacts });
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = contacts.find(({ id }) => id === req.params.contactId);
    if (!contact) {
      next();
    }
    res.json({
      ststus: "succses",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const removeContacts = contacts.find(
      ({ id }) => id === req.params.contactId
    );
    if (!removeContacts) {
      next();
    }
    const newContacts = contacts.filter(
      ({ id }) => id === req.params.contactId
    );
    res.status(200).json({
      status: "contact deleted",
      code: 200,
      data: newContacts,
    });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;
    contacts.push({ id: v4("3"), name, phone, email });
    res.status(201).json({
      code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const removeContacts = contacts.find(
      ({ id }) => id !== req.params.contactId
    );
    if (removeContacts) {
      next();
    }
    const { name, phone, email } = req.body;
    const [contact] = contacts.filter(
      (contact) => contact.id === req.params.contactId
    );
    if (!contact) {
      next();
    }
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    res.status(200).json({
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
