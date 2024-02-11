const express = require("express");
const {
  contactSchema,
  favoriteFieldSchema,
} = require("../validators/contactValidator");
const {
  getContactsAll,
  getContactById,
  removeContact,
  addContact,
  upDateContact,
} = require("../services/contactService");
const handleJoiError = (error, res) => {
  res.status(400).json({ message: error.message });
};
const handleNotFoundError = (res, contactId) => {
  res.status(404).json({ message: `Not found id: ${contactId}` });
};
const getAll = async (req, res, next) => {
  try {
    const data = await getContactsAll();
    res.json({ data });
  } catch (error) {
    next(error);
  }
};
const getById = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const data = await getContactById(contactId);
    console.log(data);
    if (data) {
      res.json(data);
    } else {
      handleNotFoundError(res, contactId);
    }
  } catch (error) {
    next(error);
  }
};
const add = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      handleJoiError(error, res);
    } else {
      const response = await addContact(req.body);
      res.status(201).json(response);
    }
  } catch (error) {
    next(error);
  }
};
const deleted = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const data = await removeContact(contactId);
    if (data) {
      res.json({ message: "Contact deleted" });
    } else {
      handleNotFoundError(res, contactId);
    }
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const { error } = contactSchema.validate(req.body);
    if (error) {
      handleJoiError(error, res);
    } else {
      const updatedContact = await upDateContact(contactId, req.body);
      if (updatedContact) {
        res.json(updatedContact);
      } else {
        handleNotFoundError(res, contactId);
      }
    }
  } catch (error) {
    next(error);
  }
};
const updateFavorite = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const { favorite } = req.body;
    const { error } = favoriteFieldSchema.validate({ favorite });
    if (error) {
      handleJoiError(error, res);
    } else {
      const updatedContact = await upDateContact(contactId, { favorite });
      if (updatedContact) {
        res.json(updatedContact);
      } else {
        handleNotFoundError(res, contactId);
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  deleted,
  update,
  updateFavorite,
};
