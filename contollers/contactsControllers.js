const controllerWrapper = require("../helpers/controllerWrapper");
const errorHandler = require("../helpers/errorsHandler");
const { Contact } = require("../models/contactModel");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const { favorite } = req.query;
  console.log(req.query);
  if (favorite) {
    const result = await Contact.find({ owner, favorite })
      .skip(skip)
      .limit(limit)
      .populate("owner", "name email");
    res.json(result);
  }
  const result = await Contact.find({ owner })
    .skip(skip)
    .limit(limit)
    .populate("owner", "name email");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  console.log(req.params);
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw errorHandler(404, "Not found");
  }
  res.json(contact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw errorHandler(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  console.log(req.user);
  const contact = await Contact.create({ ...req.body, owner });
  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw errorHandler(404, "Not Found");
  }
  res.status(200).json(contact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw errorHandler(404, "Not Found");
  }
  res.status(200).json(contact);
};

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getContactById),
  removeContact: controllerWrapper(removeContact),
  addContact: controllerWrapper(addContact),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
