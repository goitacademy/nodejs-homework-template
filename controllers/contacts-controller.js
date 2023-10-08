const Contact = require("../models/Contact");
const HttpError = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const getContactsList = async (req, res) => {
  const list = await Contact.find({}, "-__v");
  res.json(list);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  //const contactBId = await Contact.findOne({ _id: id });
  const contactBId = await Contact.findById(id);

  if (!contactBId) {
    throw HttpError(404, `Not found`);
  }

  res.json(contactBId);
};

const addNewContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const removeContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);

  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.json({ message: "contact deleted" });
};

const updateContactById = async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!contact) {
    throw HttpError(404, `Not found`);
  }

  res.json(contact);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!contact) {
    throw HttpError(404, `Not found`);
  }

  res.json(contact);
};

module.exports = {
  getContactsList: ctrlWrapper(getContactsList),
  getContactById: ctrlWrapper(getContactById),
  addNewContact: ctrlWrapper(addNewContact),
  removeContactById: ctrlWrapper(removeContactById),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
