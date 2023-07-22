const { Contact } = require("../models");
const { ctrlWrap, FindByIdError } = require("../helpers");
const getContacts = async (req, res) => {
  const result = await Contact.find();

  res.status(200).json(result);
};

const getContactsById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  FindByIdError(result);
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};
const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  FindByIdError(result);
  res.status(200).json({
    message: "contact deleted",
  });
};

const updateContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  FindByIdError(result);
  res.status(200).json(result);
};
const updateStatusById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  FindByIdError(result);
  res.status(200).json(result);
};
module.exports = {
  getContacts: ctrlWrap(getContacts),
  getContactsById: ctrlWrap(getContactsById),
  addContact: ctrlWrap(addContact),
  deleteContact: ctrlWrap(deleteContact),
  updateContactById: ctrlWrap(updateContactById),
  updateStatusById: ctrlWrap(updateStatusById),
};
