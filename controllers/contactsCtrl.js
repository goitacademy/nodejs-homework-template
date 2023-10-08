const { Contact, joiSchema } = require("../models/contactModel");
const { HttpError } = require("../helpers");

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");

  if (req.query.favorite === "true") {
    const favContacts = await Contact.find({ owner, favorite: true });
    return res.status(200).json(favContacts);
  }

  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { body } = req;
  const { _id: owner } = req.user;
  try {
    const { error } = joiSchema.validate(body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create({ ...body, owner });
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  try {
    if (!body) {
      throw HttpError(400, "missing fields");
    }
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }
    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  try {
    if (!body?.favorite) {
      throw HttpError(400, "missing field favorite");
    }
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }
    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
