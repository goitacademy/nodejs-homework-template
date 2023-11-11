const moviesServise = require("../models/contacts.js");

// const addContactChema = require("../schemas/contacts-schems.js");

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
      const error = new Error(`Contact with id ${contactId} not found`);
      error.status = 404;
      throw error;
      //   return res  вінексти в хелперс 44 минута
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
    // const { error } = addContactChema.validate(req.body);
    // if (error) {
    //   const error = new Error();
    //   error.status = 404;
    //   throw error;
    // }
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
      const error = new Error(`Contact with id ${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.status(201).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addNewContact,
  deleteById,
};
