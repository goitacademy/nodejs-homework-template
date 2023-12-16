const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

// ============================== Get All

const listContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

// ============================== Get by ID

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

// ============================== Add

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

// ============================== Delete

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  console.log(Contact);
  const result = await Contact.findByIdAndDelete({ _id: contactId });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "contact deleted" });
};

// ============================== Update

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

// ============================== Update status

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
