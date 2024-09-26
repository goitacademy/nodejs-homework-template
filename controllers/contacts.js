const { Contact } = require("../models/contact");

const { HttpError, contrWrapper } = require("../utils");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found!");
  } else {
    res.status(200).json(result);
  }
};

const deletedContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.json({
    deletedContact: result,
    message: "Deleted successfully",
  });
};

module.exports = {
  getById: contrWrapper(getById),
  getAll: contrWrapper(getAll),
  addContact: contrWrapper(addContact),
  deletedContactById: contrWrapper(deletedContactById),
  updateContactById: contrWrapper(updateContactById),
  updateStatusContact: contrWrapper(updateStatusContact),
};
