const { httpError } = require("../utils");
const { controlWrapper } = require("../utils");
const { Contact } = require("../models");

const getAllContacts = async (_, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw httpError(404, "Not Found");
  }
  res.json(result);
};

const addNewContact = async (req, res) => {
  const { body } = req;
  const result = await Contact.create(body);

  res.status(201).json(result);
};

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw httpError(404, "Not Found");
  }
  res.json(result);
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!result) {
    throw httpError(404, "Not Found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!result) {
    throw httpError(404, "Not Found");
  }

  res.json(result);
};

const contactContoller = {
  getAllContacts: controlWrapper(getAllContacts),
  getContactById: controlWrapper(getContactById),
  addNewContact: controlWrapper(addNewContact),
  removeContactById: controlWrapper(removeContactById),
  updateContactById: controlWrapper(updateContactById),
  updateFavorite: controlWrapper(updateFavorite),
};

module.exports = contactContoller;
