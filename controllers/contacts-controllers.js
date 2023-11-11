const moviesServise = require("../models/contacts.js");
const HttpErr = require("../helpers/HttpError.js");
const contactChema = require("../schems/contacts-schems.js");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await moviesServise.listContacts();
    res.json(result);
    res.json({ message: "Your contacts" });
  } catch (error) {
    next(error);
  }
  //     res.status(500).json({ message: error.message });
  //   }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await moviesServise.getContactById(contactId);
    if (!result) {
      throw HttpErr(404, `Contact with id ${contactId} not found`);

      //   return res  вінексти в хелперс
      //     .status(404)
      //     .json({ message: `Contact with id ${contactId} not faind` });
    }
    res.json(result);
  } catch (error) {
    next(error);
    // const { status = 500, message = "Server  error" } = error;
    // res.status(500).json({ message: error.message });
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const { error } = contactChema.addContactChema.validate(req.body);

    if (error) {
      throw HttpErr(404, error.message);
    }
    const result = await moviesServise.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await moviesServise.removeContact(contactId);
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
};
