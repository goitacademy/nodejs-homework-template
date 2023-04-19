const { Contact } = require("../models/contact.js");

const HttpError = require("../helpers/HttpError");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.json({ message: "Contact Deleted" });
  } catch (error) {
    next(error);
  }
};

const editContact = async (req, res, next) => {
  try {
    const isBody = Object.keys(req.body);
    if (isBody.length === 0) {
      throw HttpError(400, "Missing Fields");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const editFavorite = async (req, res, next) => {
  try {
    const isBody = Object.keys(req.body);
    if (isBody.length === 0) {
      throw HttpError(400, "missing field favorite");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContact,
  addNewContact,
  deleteContact,
  editContact,
  editFavorite,
};
