const { ctrlsWrapper, newError } = require("../helpers");
const Contact = require("../models/Contact");

const getContacts = async (req, res, next) => {
  const { page = 1, perPage = Infinity, favorite } = req.query;
  const result = await Contact.find(
    {
      owner: req.user._id,
      favorite: favorite ?? [true, false],
    },
    "-createdAt -updatedAt",
    { skip: (page - 1) * perPage, limit: perPage }
  ).populate("owner", "_id email");
  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    next(newError(404, "Not found"));
  }
  res.status(200).json(result);
};

const addContact = async (req, res, next) => {
  const result = await Contact.create({ ...req.body, owner: req.user._id });
  res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    next(newError(404, "Not found"));
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    next(newError(404, "Not found"));
  }
  res.status(200).json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    next(newError(404, "Not found"));
  }
  res.status(200).json(result);
};

module.exports = {
  getContacts: ctrlsWrapper(getContacts),
  getContactById: ctrlsWrapper(getContactById),
  addContact: ctrlsWrapper(addContact),
  removeContact: ctrlsWrapper(removeContact),
  updateContact: ctrlsWrapper(updateContact),
  updateStatusContact: ctrlsWrapper(updateStatusContact),
};
