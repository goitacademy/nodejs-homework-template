const { Contact } = require('../models/contact');
const { HttpError, ctrlWrapper } = require('../helpers');

const getAllContacts = async (req, res) => {
  const allContacts = await Contact.find({}, "-createdAt -updatedAt");

  res.json(allContacts);
};

const getByIdContact = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId, "-createdAt -updatedAt");

  if (!contactById) {
    throw HttpError(404, 'Not found');
  };

  res.json(contactById);
};

const postContact = async (req, res) => {
  const newContact = await Contact.create(req.body);

  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await Contact.findByIdAndRemove(contactId);

  if (!removedContact) {
    throw HttpError(404, 'Not found');
  };

  res.json({ message: "contact deleted" })
};

const putContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});

  if (!updatedContact) {
    throw HttpError(404, 'Not found');
  };

  res.json(updatedContact);
};

const patchContact = async (req, res, next) => {
  console.log(req.path.split("/").includes("favorite"))
  const { contactId } = req.params;
  const updateStatusContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});

  if (!updateStatusContact) {
    throw HttpError(404, 'Not found');
  };

  res.json(updateStatusContact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getByIdContact: ctrlWrapper(getByIdContact),
  postContact: ctrlWrapper(postContact),
  deleteContact: ctrlWrapper(deleteContact),
  putContact: ctrlWrapper(putContact),
  patchContact: ctrlWrapper(patchContact),
};