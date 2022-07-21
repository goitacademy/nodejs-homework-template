const createError = require("../helpers");
const { Contact, schemas } = require("../models");

const listContacts = async (req, res) => {
  const result = await Contact.find({});
  console.log(result);
  res.json({ status: "success", code: 200, payload: { result } });
};

const addContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
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
    const { error } = schemas.contactAddSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
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
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res) => {
  const { params, body } = req;
  const { contactId } = params;
  if (!body) {
    res.status(400).json({ message: "missing field favorite" });
  }
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
