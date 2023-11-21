// const contacts = require("../models/contacts");

const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res, next) => {
  const owner = req.user.id;
  const { page = 1, limit = 20, favorite } = req.query;
  console.log(favorite);

  const startFrom = (page - 1) * limit;
  let result;

  if (!favorite) {
    result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      startFrom,
      limit,
    });
  } else {
    result = await Contact.find({ owner, favorite }, "-createdAt -updatedAt", {
      startFrom,
      limit,
    });
  }
  res.json(result);
};

const getContactById = async (req, res) => {
  const result = await Contact.findById(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create({ ...req.body, owner: req.user.id });
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const result = await Contact.findByIdAndDelete(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }

  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    {
      new: true,
    }
  );
  if (!result) throw HttpError(404, "Not found");

  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
