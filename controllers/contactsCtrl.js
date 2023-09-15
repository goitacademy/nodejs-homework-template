const HttpError = require("../helpers/HttpError");
const { Contact } = require("../schemas/ValidateSchemasContacts");

const mongoose = require("mongoose");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw HttpError(404, "Not found");
    }
    const searchedContact = await Contact.findById(contactId);
    if (!searchedContact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(searchedContact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { email } = req.body;
    const IfUniqueEmail = await Contact.findOne({ email });
    if (IfUniqueEmail) {
      throw HttpError(400, "Email is already taken");
    }
    const result = await Contact.create(req.body);
    console.log(result);
    res.status(201).json(result);
    if (!result) {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw HttpError(404, "Not found");
    }
    const result = await Contact.findByIdAndRemove(contactId);
    if (result) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

// const updateContact = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.updateContact(contactId, req.body);
//     if (result) {
//       res.json(result);
//     } else {
//       throw HttpError(404, "Not found");
//     }
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  // updateContact,
};
