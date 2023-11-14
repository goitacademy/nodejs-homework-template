const Contact = require("../models/contact");

const { HttpError, ctrlWrap } = require("../helpers");



const getContacts = async (req, res) => {
  const result = await Contact.find({}, '-createdAt -updatedAt').exec();
  res.send(result);
};

const getContact = async (req, res) => {
  const result = await Contact.findById(req.params.contactId, '-createdAt -updatedAt').exec();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.send(result);
};

const createContact = async (req, res) => {
const {name} = req.body;
  const contact = await Contact.findOne({name}).exec();
  console.log(contact)
  if (contact) {
    throw HttpError(409, "Contact already exists");
  }

  const result = await Contact.create(req.body);

  res.status(201).send(result);
};

const deleteContact = async (req, res) => {
  const result = await Contact.findByIdAndDelete(req.params.contactId).exec();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.send({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {new: true}).exec();
    if (!result) {
    throw HttpError(404, "Not found");
  }
  res.send(result);
};

const updateStatusContact = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {new: true}).exec();
    if (!result) {
    throw HttpError(404, "Not found");
  }
  res.send(result);
};

module.exports = {
  getContacts: ctrlWrap(getContacts),
  getContact: ctrlWrap(getContact),
  createContact: ctrlWrap(createContact),
  deleteContact: ctrlWrap(deleteContact),
  updateContact: ctrlWrap(updateContact),
  updateStatusContact: ctrlWrap(updateStatusContact),
};
