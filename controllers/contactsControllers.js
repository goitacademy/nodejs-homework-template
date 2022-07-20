const contactsServices = require("../services");
const createError = require("../helpers");
const contactAddSchema = require("../schemas");
const { Contact } = require("../models");

const listContacts = async (req, res) => {
  const result = await Contact.find({});
  res.json({ status: "success", code: 200, payload: { result } });
};

// const addContact = async (req, res, next) => {
//   try {
//     const { error } = contactAddSchema.validate(req.body);
//     if (error) {
//       throw createError(400, error.message);
//     }
//     const result = await contactsServices.create(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// };
const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { result },
  });
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsServices.getById(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json({ status: "success", code: 200, payload: { result } });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsServices.update(contactId, req.body);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsServices.remove(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
