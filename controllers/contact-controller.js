const Contact = require("../models/contacts");
const HttpError = require("../helper/HttpError");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactByIdb = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404, `Contact with id '${id}' not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    // валидация в декораторе
     const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404, `Contact with id '${id}' not found`);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};
const updateContact = async (req, res, next) => {
  try {
       // валидация в декораторе
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
      throw HttpError(
        404,
        `Missing fields! Contact with id '${id}' not found.`
      );
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
      throw HttpError(
        404,
        `Missing fields! Contact with id '${id}' not found.`
      );
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllContacts,
  getContactByIdb,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
};
