// const moviesServise = require("../models/contacts.js");
const HttpErr = require("../helpers/HttpError.js");
// const contactChema = require("../schems/contacts-schems.js");
const {
  Contact,
  addContactChema,
  updateContactChema,
} = require("../models/Contact.js");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpErr(404, `Contact with id ${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const { error } = addContactChema.validate(req.body);
    if (error) {
      throw HttpErr(404, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpErr(404, `Contact with id ${contactId} not found`);
    }
    res.status(201).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(req.params);
    const { error } = updateContactChema.validate(req.body);
    if (error) {
      throw HttpErr(404, error.message);
    }

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(req.params);
    const { error } = updateContactChema.validate(req.body);
    if (error) {
      throw HttpErr(404, "missing field favorite");
    }

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addNewContact,
  deleteById,
  updateContact,
  updateStatusContact,
};
