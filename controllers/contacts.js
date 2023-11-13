const Contact = require("../models/contact");

const { HttpError, ctrlWrap } = require("../helpers");



const getAll = async (req, res) => {
  const result = await Contact.find({}, '-createdAt -updatedAt');
  res.json(result);
};

const getById = async (req, res) => {
  const result = await Contact.findById(req.params.contactId, '-createdAt -updatedAt');
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);

  const { name } = req.params;
  const contact = await Contact.findOne({ name });
  if (contact) {
    throw HttpError(409, "Contact already exists");
  }
  
  res.status(201).json(result);
};

const remove = async (req, res) => {
  const result = await Contact.findByIdAndDelete(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateByID = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {new: true});
  console.log(result);
    if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {new: true});
  console.log(result);
    if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrap(getAll),
  getById: ctrlWrap(getById),
  add: ctrlWrap(add),
  remove: ctrlWrap(remove),
  updateByID: ctrlWrap(updateByID),
  updateStatusContact: ctrlWrap(updateStatusContact),
};
