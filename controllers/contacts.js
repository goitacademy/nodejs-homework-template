const { Contact } = require("../models/contact");

const { HttpError, CtrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const addContacts = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAllContacts: CtrlWrapper(getAllContacts),
  getContactById: CtrlWrapper(getContactById),
  addContacts: CtrlWrapper(addContacts),
  deleteContactById: CtrlWrapper(deleteContactById),
  updateContact: CtrlWrapper(updateContact),
  updateFavorite: CtrlWrapper(updateFavorite),
};
