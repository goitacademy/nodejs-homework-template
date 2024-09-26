const HttpError = require("../helpers/HttpError");
const cntrlWrapper = require("../utils/cntrlWrapper");
const { Contact } = require("../models/contacts");

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner };

  if (favorite === "true") {
    query.favorite = true;
  }

  const result = await Contact.find(query, "", {
    skip,
    limit,
  });

  if (!result) {
    res.status(500).json({
      message: "Server error",
    });
  }

  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }

  res.json(result);
};

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  if (!result) next(error);

  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.status(200).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }

  res.json({ message: "deleted" });
};

const updateStatusContact = async (req, res) => {
  if (Object.entries(req.body).length === 0) {
    throw HttpError(400, "missing field favorite");
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.status(200).json(result);
};

module.exports = {
  listContacts: cntrlWrapper(listContacts),
  getContactById: cntrlWrapper(getContactById),
  addContact: cntrlWrapper(addContact),
  removeContact: cntrlWrapper(removeContact),
  updateContact: cntrlWrapper(updateContact),
  updateStatusContact: cntrlWrapper(updateStatusContact),
};
