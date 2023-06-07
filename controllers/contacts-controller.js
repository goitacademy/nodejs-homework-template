const {
  Contact,
  updContactFavoriteSchema,
  addContactSchema,
} = require("../models");

const { HttpError } = require("../helpers");

const getListContacts = async (req, res, next) => {
  try {
    res.json(await Contact.find());
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) throw HttpError(404);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) throw HttpError(404);
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) throw HttpError(404);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = updContactFavoriteSchema.validate(req.body);
    if (error) throw HttpError(400, "missing field favorite");
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: req.body.favorite },
      {
        new: true,
      }
    );
    if (!result) throw HttpError(404);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getListContacts: getListContacts,
  getContactById: getContactById,
  addContact: addContact,
  removeContact: removeContact,
  updateContact: updateContact,
  updateStatusContact: updateStatusContact,
};
