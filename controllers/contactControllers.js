const { Contact } = require("../models/contact");
const { HttpError, decorator } = require("../helpers");

const getAllContacts = async (req, res, next) => {
  const contactList = await Contact.find();

  res.status(200).json(contactList);
};

const getContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json(contact);
};

const postContact = async (req, res, next) => {
  const body = req.body;

  const contactToAdd = await Contact.create(body);

  res.status(201).json(contactToAdd);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const contactToDelete = await Contact.findByIdAndRemove({ _id: id });

  if (!contactToDelete) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json({
    mesage: "contact deleted",
  });
};

const changeContactData = async (req, res, next) => {
  const body = req.body;

  const { id } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  });

  if (!updatedContact) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!updatedContact) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json(updatedContact);
};

module.exports = {
  getAllContacts: decorator(getAllContacts),
  getContact: decorator(getContact),
  postContact: decorator(postContact),
  deleteContact: decorator(deleteContact),
  changeContactData: decorator(changeContactData),
  updateStatusContact: decorator(updateStatusContact),
};
